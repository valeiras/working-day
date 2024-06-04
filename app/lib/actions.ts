"use server";

import { insertBlock, insertProject, insertStartTime, insertStopTime, updateProject } from "./db/queries";

export const createNewProject = async ({ name }: { name: string }) => {
  await insertProject({ name });
};

export const createNewBlock = async ({ projectId }: { projectId: number }) => {
  const { data, error } = await insertBlock({ projectId });
  return { data, error };
};

export const setActiveBlock = async ({ projectId, blockId }: { projectId: number; blockId: number }) => {
  const { data, error } = await updateProject({ projectId, projectData: { active_block_id: blockId } });
  return { data, error };
};

export const addStartTime = async ({ blockId }: { blockId: number }) => {
  const { data, error } = await insertStartTime({ blockId });
  return { data, error };
};

export const addStopTime = async ({ startTimeId }: { startTimeId: number }) => {
  const { data, error } = await insertStopTime({ startTimeId });
  return { data, error };
};
