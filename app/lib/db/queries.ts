"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Tables } from "./database.types";
import { createClerkServerSupabaseClient } from "./serverSupabaseClient";
import { PostgrestError, PostgrestBuilder } from "@supabase/postgrest-js";
import { PostgresError } from "postgres";

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

type ProjectWithActiveBlock = {
  name: string;
  activeBlock: {
    id: number;
    startTimes: { time: string; stopTimes: { time: string }[] | null }[];
  } | null;
};

export const selectProjectById = async (
  id: number
): Promise<{ data: ProjectWithActiveBlock | null; error?: PostgrestError | null }> => {
  const client = await createClerkServerSupabaseClient();

  return withErrorHandling(
    client
      .from("projects")
      .select(
        `name, 
        activeBlock:working_blocks!projects_active_block_id_fkey(
          id, startTimes:start_times(time, stopTimes:stop_times(time)))`
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
    if (error) throw new PostgresError(error.message);
  } catch (e) {
    if (error instanceof PostgresError) {
      console.error(error.message);
    } else {
      console.error("Something went wrong");
    }
  } finally {
    return { data, error };
  }
};
