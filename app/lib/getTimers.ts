import { ProjectWithWorkingTimes } from "./db/queries";
import { computeAccumulatedTimerCs } from "./utils";

export const getAllTimers = ({ projects }: { projects: ProjectWithWorkingTimes[] }) => {
  const currentTimersCs: Record<number, number> = {};
  const totalTimersCs: Record<number, number> = {};
  const currentInitialMs: Record<number, number> = {};
  const totalInitialMs: Record<number, number> = {};
  const isRunning: Record<number, boolean> = {};

  projects?.forEach((project) => {
    const { workingBlocks, activeBlock, id } = project;
    const totalCs = project.workingBlocks.reduce((acc, { startTimes }) => {
      return acc + computeAccumulatedTimerCs(startTimes);
    }, 0);

    const activeBlockWithWorkingTimes = workingBlocks.find((block) => block.id === activeBlock?.id) || null;
    const isProjectRunning =
      activeBlockWithWorkingTimes !== null &&
      activeBlockWithWorkingTimes.startTimes?.slice(-1)[0]?.pauseTimes?.length === 0;

    const currentCs = computeAccumulatedTimerCs(activeBlockWithWorkingTimes?.startTimes || null);

    currentTimersCs[id] = currentCs;
    totalTimersCs[id] = totalCs;
    isRunning[id] = isProjectRunning;

    currentTimersCs[id] = currentCs;
    totalTimersCs[id] = totalCs;
    // We divide and multiply by 1000 to round to the nearest second, and synchronize all clocks
    currentInitialMs[id] = Math.round((Date.now() - currentCs * 10) / 1000) * 1000;
    totalInitialMs[id] = Math.round((Date.now() - totalCs * 10) / 1000) * 1000;
  });

  return {
    currentTimersCs,
    totalTimersCs,
    currentInitialMs,
    totalInitialMs,
    isRunning,
  };
};

export const getSingleTimer = ({ projects, projectId }: { projects: ProjectWithWorkingTimes[]; projectId: number }) => {
  const currProject = projects.find((project) => project.id === projectId);

  if (!currProject) return null;

  const { workingBlocks, activeBlock } = currProject;
  const totalTimerCs = currProject.workingBlocks.reduce((acc, { startTimes }) => {
    return acc + computeAccumulatedTimerCs(startTimes);
  }, 0);

  const activeBlockWithWorkingTimes = workingBlocks.find((block) => block.id === activeBlock?.id) || null;
  const isRunning =
    activeBlockWithWorkingTimes !== null &&
    activeBlockWithWorkingTimes.startTimes?.slice(-1)[0]?.pauseTimes?.length === 0;

  const currentTimerCs = computeAccumulatedTimerCs(activeBlockWithWorkingTimes?.startTimes || null);

  // We divide and multiply by 1000 to round to the nearest second, and synchronize all clocks
  const currentInitialMs = Math.round((Date.now() - currentTimerCs * 10) / 1000) * 1000;
  const totalInitialMs = Math.round((Date.now() - totalTimerCs * 10) / 1000) * 1000;

  return {
    currentTimerCs,
    totalTimerCs,
    currentInitialMs,
    totalInitialMs,
    isRunning,
  };
};
