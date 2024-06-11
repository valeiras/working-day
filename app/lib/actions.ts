"use server";

import {
  insertBlock,
  insertProject,
  insertStartTime,
  insertPauseTime,
  selectAllProjectsWithWorkingTimes,
  updateProject,
} from "./db/queries";

export const createNewProject = async ({ name }: { name: string }) => {
  await insertProject({ name });
};

export const createNewBlock = async ({ projectId }: { projectId: number }) => {
  const { data, error } = await insertBlock({ projectId });
  return { data, error };
};

export const setActiveBlock = async ({ projectId, blockId }: { projectId: number; blockId: number | null }) => {
  const { data, error } = await updateProject({ projectId, projectData: { active_block_id: blockId } });
  return { data, error };
};

export const addStartTime = async ({ blockId }: { blockId: number | null }) => {
  if (!blockId) {
    console.error("Block ID is missing");
    return { data: null, error: "Block ID is missing" };
  }
  const { data, error } = await insertStartTime({ blockId });
  return { data, error };
};

export const addPauseTime = async ({ startTimeId }: { startTimeId: number }) => {
  const { data, error } = await insertPauseTime({ startTimeId });
  return { data, error };
};

export const getAllProjects = async () => {
  const { data, error } = await selectAllProjectsWithWorkingTimes();
  return { data, error };
};
