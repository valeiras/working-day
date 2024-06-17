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

      const totalWorkingHours = Math.random() * 8;
      const startWorkingHour = Math.random() * (24 - totalWorkingHours);
      const endWorkingHour = startWorkingHour + totalWorkingHours;

      const { data: block } = await createNewBlock({ projectId });
      if (!block) return;

      day.setMinutes(startWorkingHour * 60);
      const { data: startTime } = await insertStartTime({
        blockId: block.id,
        date: day,
      });
      if (!startTime) return;

      day.setMinutes(endWorkingHour * 60);
      await insertPauseTime({
        startTimeId: startTime.id,
        date: day,
      });
    }
  }
};
