"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Tables } from "./database.types";
import { createClerkServerSupabaseClient } from "./serverSupabaseClient";
import { PostgrestError, PostgrestBuilder } from "@supabase/postgrest-js";
import { DBError } from "../errors";

export type StartAndPauseTimes = { id: number; startTime: string; pauseTime: string | null }[] | null;

export type ProjectWithWorkingTimes = {
  name: string;
  id: number;
  activeBlock: {
    id: number;
    times: StartAndPauseTimes;
  } | null;
  workingBlocks: { id: number; workingTimeSeconds: number; createdAt: string }[];
};

export type ProjectWithActiveBlock = {
  name: string;
  id: number;
  activeBlock: {
    id: number;
    times: StartAndPauseTimes;
  } | null;
};

export async function authenticateAndRedirect() {
  const { userId } = auth();
  if (!userId) redirect("/");

  return userId;
}

export const createProject = async ({
  name,
}: {
  name: string;
}): Promise<{ data: Tables<"projects">[] | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(client.from("projects").insert({ name }).select());
};

export const selectAllProjects = async (): Promise<{
  data: ProjectWithWorkingTimes[] | null;
  error?: PostgrestError | null;
}> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("projects")
      .select(
        `name, id,
        activeBlock:working_blocks!projects_active_block_id_fkey(id, times:working_times(id, startTime:start_time, pauseTime:pause_time)),
        workingBlocks:working_blocks!working_blocks_project_id_fkey(id, workingTimeSeconds:working_time_seconds, createdAt: created_at)`
      )
      .order("name", { ascending: true })
      .order("id", { referencedTable: "working_blocks.working_times", ascending: false })
      .returns<ProjectWithWorkingTimes[]>()
  );
};

export const selectAllProjectsInTimeRange = async ({
  initialDate,
  finalDate,
}: {
  initialDate: Date;
  finalDate: Date;
}): Promise<{
  data: ProjectWithWorkingTimes[] | null;
  error?: PostgrestError | null;
}> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("projects")
      .select(
        `name, id,
        workingBlocks:working_blocks!working_blocks_project_id_fkey(id, workingTimeSeconds:working_time_seconds, createdAt: created_at)`
      )
      .gte("workingBlocks.created_at", initialDate.toISOString())
      .lte("workingBlocks.created_at", finalDate.toISOString())
      .order("name", { ascending: true })
      .returns<ProjectWithWorkingTimes[]>()
  );
};

export const updateProject = async ({
  projectId,
  projectData,
}: {
  projectId: number;
  projectData: Partial<Tables<"projects">>;
}): Promise<{
  data: Tables<"projects"> | null;
  error?: PostgrestError | null;
}> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(client.from("projects").update(projectData).eq("id", projectId).select().maybeSingle());
};

export const deleteProject = async ({
  projectId,
}: {
  projectId: number;
}): Promise<{
  data: Tables<"projects"> | null;
  error?: PostgrestError | null;
}> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(client.from("projects").delete().eq("id", projectId));
};

export const updateBlock = async ({
  blockId,
  blockData,
}: {
  blockId: number;
  blockData: Partial<Tables<"working_blocks">>;
}): Promise<{
  data: Tables<"projects"> | null;
  error?: PostgrestError | null;
}> => {
  const client = await createClerkServerSupabaseClient();
  return withErrorHandling(client.from("working_blocks").update(blockData).eq("id", blockId).select().maybeSingle());
};

export const deleteWorkingTimesByBlockId = async ({ blockId }: { blockId: number }) => {
  const client = await createClerkServerSupabaseClient();
  return withErrorHandling(client.from("working_times").delete().in("block_id", [blockId]));
};

export const selectProjectById = async (
  id: number
): Promise<{ data: ProjectWithActiveBlock | null; error?: PostgrestError | null }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("projects")
      .select(
        `name, id,
        activeBlock:working_blocks!projects_active_block_id_fkey(
        id, times:working_times(id, startTime:start_time, pauseTime:pause_times))`
      )
      .eq("id", id)
      .returns<ProjectWithActiveBlock>()
      .maybeSingle()
  );
};

export const makeWorkingBlockInactive = async ({ blockId }: { blockId: number }) => {
  const client = await createClerkServerSupabaseClient();
  return withErrorHandling(
    client
      .from("projects")
      .update({ active_block_id: null })
      .eq("active_block_id", blockId)
      .select()
      .returns<Tables<"projects">>()
      .maybeSingle()
  );
};

export const createBlock = async ({
  projectId,
  createdAt,
  workingTimeSeconds,
}: {
  projectId: number;
  createdAt?: Date;
  workingTimeSeconds?: number;
}): Promise<{ data: Tables<"working_blocks"> | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("working_blocks")
      .insert({ project_id: projectId, created_at: createdAt?.toISOString(), working_time_seconds: workingTimeSeconds })
      .select()
      .returns<Tables<"working_blocks">>()
      .maybeSingle()
  );
};

export const insertStartTime = async ({
  blockId,
  date,
}: {
  blockId: number;
  date?: Date;
}): Promise<{ data: Tables<"working_times"> | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("working_times")
      .insert({ block_id: blockId, time: date?.toISOString() })
      .select()
      .returns<Tables<"working_times">>()
      .maybeSingle()
  );
};

export const insertPauseTime = async ({
  startTimeId,
  date,
}: {
  startTimeId: number;
  date?: Date;
}): Promise<{ data: Tables<"working_times"> | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  // If the date is not provided, use the current date
  return withErrorHandling(
    client
      .from("working_times")
      .update({ pause_time: date?.toISOString() || new Date().toISOString() })
      .eq("id", startTimeId)
      .select()
      .returns<Tables<"working_times">>()
      .maybeSingle()
  );
};

const withErrorHandling = async <T>(
  fn: PostgrestBuilder<T>
): Promise<{ data: T | null; error?: PostgrestError | null }> => {
  let error: PostgrestError | null = null;
  let data: T | null = null;
  try {
    const { data: dbData, error: dbError } = await fn;
    if (dbError) throw new DBError(dbError?.message || "Something went wrong");
    data = dbData;
    error = dbError;
  } catch (e) {
    if (e instanceof DBError) {
      console.error(e.message);
    } else {
      console.error("Something went wrong");
    }
  } finally {
    return { data, error };
  }
};
