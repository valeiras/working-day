"use server";

import {
  createBlock,
  insertStartTime,
  insertPauseTime,
  selectAllProjects,
  updateProject,
  updateBlock,
  deleteWorkingTimesByBlockId,
  makeWorkingBlockInactive,
} from "./db/queries";
import { mockUrl } from "./tests/mocks/mockData";

export const createNewBlock = async ({ projectId }: { projectId: number }) => {
  return createBlock({ projectId });
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

export const stopBlock = async ({ blockId, totalTimeSeconds }: { blockId: number; totalTimeSeconds: number }) => {
  await Promise.all([
    updateBlock({ blockId, blockData: { working_time_seconds: totalTimeSeconds } }),
    deleteWorkingTimesByBlockId({ blockId }),
    makeWorkingBlockInactive({ blockId }),
  ]);
};

export const callMockServer = async () => {
  const res = await fetch(mockUrl);
  return res.json();
};

export const populateDB = async () => {
  const daysBack = 45;

  const { data: projects } = await selectAllProjects();
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

      const { data: block } = await createBlock({
        projectId,
        createdAt: day,
        workingTimeSeconds: Math.round(workingTimeHours * 60 * 60),
      });
      if (!block) return;
    }
  }
};
