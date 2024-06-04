"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Tables } from "./database.types";
import { createClerkServerSupabaseClient } from "./serverSupabaseClient";
import { PostgrestError } from "@supabase/postgrest-js";

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
  let error: PostgrestError | null = null;
  let data: Tables<"projects">[] | null = null;

  const client = await createClerkServerSupabaseClient();

  try {
    ({ data, error } = await client.from("projects").insert({ name }).select());
    if (error) throw new Error(error.message);
  } catch (e) {
    console.log(e);
  } finally {
    return { data, error };
  }
};

export const selectAllProjects = async (): Promise<{
  data: Tables<"projects">[] | null;
  error?: PostgrestError | null;
}> => {
  let error: PostgrestError | null = null;
  let data: Tables<"projects">[] | null = null;
  const client = await createClerkServerSupabaseClient();

  try {
    ({ data, error } = await client.from("projects").select());
    if (error) throw new Error(error.message);
  } catch (e) {
    console.log(e);
  } finally {
    return { data, error };
  }
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
  let error: PostgrestError | null = null;
  let data: Tables<"projects"> | null = null;
  const client = await createClerkServerSupabaseClient();

  try {
    ({ data, error } = await client.from("projects").update(projectData).eq("id", projectId).select().maybeSingle());
    if (error) throw new Error(error.message);
  } catch (e) {
    console.log(e);
  } finally {
    return { data, error };
  }
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
  let error: PostgrestError | null = null;
  let data: ProjectWithActiveBlock | null = null;
  const client = await createClerkServerSupabaseClient();

  try {
    ({ data, error } = await client
      .from("projects")
      .select(
        `name, 
        activeBlock:working_blocks!projects_active_block_id_fkey(
          id, startTimes:start_times(time, stopTimes:stop_times(time)))`
      )
      .eq("id", id)
      .returns<ProjectWithActiveBlock>()
      .maybeSingle());
    if (error) throw new Error(error.message);
  } catch (e) {
    console.log(e);
  } finally {
    return { data, error };
  }
};

export const insertBlock = async ({
  projectId,
}: {
  projectId: number;
}): Promise<{ data: Tables<"working_blocks"> | null; error?: unknown | PostgrestError }> => {
  let error: PostgrestError | null = null;
  let data: Tables<"working_blocks"> | null = null;

  const client = await createClerkServerSupabaseClient();

  try {
    ({ data, error } = await client
      .from("working_blocks")
      .insert({ project_id: projectId })
      .select()
      .returns<Tables<"working_blocks">>()
      .maybeSingle());
    if (error) throw new Error(error.message);
  } catch (e) {
    console.log(e);
  } finally {
    return { data, error };
  }
};

export const insertStartTime = async ({
  blockId,
}: {
  blockId: number;
}): Promise<{ data: Tables<"start_times"> | null; error?: unknown | PostgrestError }> => {
  let error: PostgrestError | null = null;
  let data: Tables<"start_times"> | null = null;

  const client = await createClerkServerSupabaseClient();

  try {
    ({ data, error } = await client
      .from("start_times")
      .insert({ block_id: blockId })
      .select()
      .returns<Tables<"start_times">>()
      .maybeSingle());
    if (error) throw new Error(error.message);
  } catch (e) {
    console.log(e);
  } finally {
    return { data, error };
  }
};

export const insertStopTime = async ({
  startTimeId,
}: {
  startTimeId: number;
}): Promise<{ data: Tables<"stop_times"> | null; error?: unknown | PostgrestError }> => {
  let error: PostgrestError | null = null;
  let data: Tables<"stop_times"> | null = null;

  const client = await createClerkServerSupabaseClient();

  try {
    ({ data, error } = await client
      .from("stop_times")
      .insert({ start_time_id: startTimeId })
      .select()
      .returns<Tables<"stop_times">>()
      .maybeSingle());
    if (error) throw new Error(error.message);
  } catch (e) {
    console.log(e);
  } finally {
    return { data, error };
  }
};
