"use server";

import {
  insertBlock,
  insertProject,
  insertStartTime,
  insertPauseTime,
  selectAllProjectsWithWorkingTimes,
  updateProject,
  updateBlock,
  deleteWorkingTimesByBlockId,
  makeWorkingBlockInactive,
} from "./db/queries";

export const createNewProject = async ({ name }: { name: string }) => {
  return insertProject({ name });
};

export const createNewBlock = async ({ projectId }: { projectId: number }) => {
  return insertBlock({ projectId });
};

export const setActiveBlock = async ({ projectId, blockId }: { projectId: number; blockId: number | null }) => {
  return updateProject({ projectId, projectData: { active_block_id: blockId } });
};

// This should be simply based on the selected project: the active block id can be obtained from the DB
export const addStartTime = async ({ blockId }: { blockId: number | null }) => {
  if (!blockId) {
    console.error("Block ID is missing");
    return { data: null, error: "Block ID is missing" };
  }
  return insertStartTime({ blockId });
};

export const addPauseTime = async ({ startTimeId }: { startTimeId: number }) => {
  return insertPauseTime({ startTimeId });
};

export const getAllProjects = async () => {
  return selectAllProjectsWithWorkingTimes();
};

export const stopBlock = async ({ blockId, totalTimeSeconds }: { blockId: number; totalTimeSeconds: number }) => {
  await Promise.all([
    updateBlock({ blockId, blockData: { working_time_seconds: totalTimeSeconds } }),
    deleteWorkingTimesByBlockId({ blockId }),
    makeWorkingBlockInactive({ blockId }),
  ]);
};

export const populateDB = async () => {
  const daysBack = 45;

  const { data: projects } = await getAllProjects();
  if (!projects) return;

  const date = new Date();
  date.setDate(date.getDate() - daysBack);

  for (let ii = 0; ii < daysBack; ii++) {
    const day = new Date(date);
    day.setDate(day.getDate() + ii);
    console.log(day);

    for (const project of projects) {
      const { id: projectId } = project;

      const hasWorkingTime = Math.random() > 0.5;
      if (!hasWorkingTime) continue;

      // We work a maximum of 8 working hours per day
      const workingTimeHours = Math.random() * 8;
      // We start working between 8am and 12pm
      const startWorkingHour = 8 + Math.random() * 4;
      day.setMinutes(startWorkingHour * 60);

      const { data: block } = await insertBlock({
        projectId,
        createdAt: day,
        workingTimeSeconds: workingTimeHours * 60 * 60,
      });
      if (!block) return;
    }
  }
};
