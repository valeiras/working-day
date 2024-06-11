"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Tables } from "./database.types";
import { createClerkServerSupabaseClient } from "./serverSupabaseClient";
import { PostgrestError, PostgrestBuilder } from "@supabase/postgrest-js";
import { DBError } from "../errors";

export type StartTimes = { id: number; time: string; stopTimes: { time: string }[] | null }[] | null;

export type ProjectWithWorkingTimes = {
  name: string;
  id: number;
  activeBlock: { id: number } | null;
  workingBlocks: { id: number; startTimes: StartTimes }[];
};

export type ProjectWithActiveBlock = {
  name: string;
  id: number;
  activeBlock: {
    id: number;
    startTimes: StartTimes;
  } | null;
};

export async function authenticateAndRedirect() {
  const { userId } = auth();
  if (!userId) redirect("/");

  return userId;
}

export const insertProject = async ({
  name,
}: {
  name: string;
}): Promise<{ data: Tables<"projects">[] | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(client.from("projects").insert({ name }).select());
};

export const selectAllProjects = async (): Promise<{
  data: Tables<"projects">[] | null;
  error?: PostgrestError | null;
}> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(client.from("projects").select());
};

export const selectAllProjectsWithWorkingTimes = async (): Promise<{
  data: ProjectWithWorkingTimes[] | null;
  error?: PostgrestError | null;
}> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("projects")
      .select(
        `name, id,
        activeBlock:working_blocks!projects_active_block_id_fkey(id),
        workingBlocks:working_blocks!working_blocks_project_id_fkey(id, startTimes:start_times(id, time, stopTimes:stop_times(time)))`
      )
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
          id, startTimes:start_times(id, time, stopTimes:stop_times(time)))`
      )
      .eq("id", id)
      .returns<ProjectWithActiveBlock>()
      .maybeSingle()
  );
};

export const insertBlock = async ({
  projectId,
}: {
  projectId: number;
}): Promise<{ data: Tables<"working_blocks"> | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("working_blocks")
      .insert({ project_id: projectId })
      .select()
      .returns<Tables<"working_blocks">>()
      .maybeSingle()
  );
};

export const insertStartTime = async ({
  blockId,
}: {
  blockId: number;
}): Promise<{ data: Tables<"start_times"> | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client.from("start_times").insert({ block_id: blockId }).select().returns<Tables<"start_times">>().maybeSingle()
  );
};

export const insertStopTime = async ({
  startTimeId,
}: {
  startTimeId: number;
}): Promise<{ data: Tables<"stop_times"> | null; error?: unknown | PostgrestError }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("stop_times")
      .insert({ start_time_id: startTimeId })
      .select()
      .returns<Tables<"stop_times">>()
      .maybeSingle()
  );
};

const withErrorHandling = async <T>(
  fn: PostgrestBuilder<T>
): Promise<{ data: T | null; error?: PostgrestError | null }> => {
  let error: PostgrestError | null = null;
  let data: T | null = null;

  try {
    ({ data, error } = await fn);
    if (error) throw new DBError(error.message);
  } catch (e) {
    if (error instanceof DBError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong");
    }
  } finally {
    return { data, error };
  }
};
