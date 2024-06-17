import { ProjectWithWorkingTimes } from "./db/queries";
import { computeAccumulatedTimerCs } from "./utils";

export const getAllTimers = ({ projects }: { projects: ProjectWithWorkingTimes[] | null | undefined }) => {
  const currentTimersCs: Record<number, number> = {};
  const totalTimersCs: Record<number, number> = {};
  const currentInitialMs: Record<number, number> = {};
  const totalInitialMs: Record<number, number> = {};
  const isRunning: Record<number, boolean> = {};
  const isActive: Record<number, boolean> = {};

  projects?.forEach((project) => {
    const { id, activeBlock } = project;
    const {
      currentTimerCs: currentCs,
      totalTimerCs: totalCs,
      currentInitialMs: currentMs,
      totalInitialMs: totalMs,
      isRunning: isProjectRunning,
    } = computeTimers(project);

    currentTimersCs[id] = currentCs;
    totalTimersCs[id] = totalCs;
    isRunning[id] = isProjectRunning;
    isActive[id] = activeBlock?.id !== undefined;
    currentInitialMs[id] = currentMs;
    totalInitialMs[id] = totalMs;
  });

  return {
    currentTimersCs,
    totalTimersCs,
    currentInitialMs,
    totalInitialMs,
    isRunning,
    isActive,
  };
};

export const getSingleTimer = ({ projects, projectId }: { projects: ProjectWithWorkingTimes[]; projectId: number }) => {
  const currProject = projects.find((project) => project.id === projectId);

  if (!currProject) return null;
  return computeTimers(currProject);
};

const computeTimers = (project: ProjectWithWorkingTimes) => {
  const { workingBlocks, activeBlock } = project;
  const totalTimeSeconds = workingBlocks.reduce((acc, { workingTimeSeconds }) => {
    return acc + (workingTimeSeconds || 0);
  }, 0);

  const currentTimerCs = computeAccumulatedTimerCs(activeBlock?.times || null);
  const totalTimerCs = currentTimerCs + totalTimeSeconds * 100;

  const isRunning = activeBlock !== null && !activeBlock.times?.[0]?.pauseTime;

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
