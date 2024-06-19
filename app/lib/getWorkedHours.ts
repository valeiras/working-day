import { ProjectWithWorkingTimes } from "./db/queries";
import { computeAccumulatedTimerSeconds, formatDate } from "./utils";

export const getWorkedHours = ({
  projects,
  startDate,
  endDate,
}: {
  projects: ProjectWithWorkingTimes[] | null | undefined;
  startDate?: Date;
  endDate?: Date;
}) => {
  const workedHours: Record<number, number> = {};

  projects?.forEach((project) => {
    workedHours[project.id] = computeHours(project);
  });

  return {
    workedHours,
  };
};

export const getWorkedHoursPerDay = ({ projects }: { projects: ProjectWithWorkingTimes[] | null | undefined }) => {
  const workedHours: Record<string, Record<string, string>> = {};

  const emptyTimes: Record<string, string> = {};
  projects?.forEach(({ name }) => (emptyTimes[name] = "0"));

  projects?.forEach((project) => {
    const { workingBlocks, activeBlock, name } = project;
    workingBlocks.forEach(({ workingTimeSeconds, createdAt }) => {
      const dateStr = formatDate(new Date(createdAt));
      if (!workedHours[dateStr]) workedHours[dateStr] = { ...emptyTimes };
      workedHours[dateStr][name] = (parseFloat(workedHours[dateStr][name]) + workingTimeSeconds / 3600).toFixed(2);
    });
  });

  // TODO: take into account the active block
  return {
    workedHours,
  };
};

const computeHours = (project: ProjectWithWorkingTimes) => {
  const { workingBlocks, activeBlock } = project;
  const pastTimeSeconds = workingBlocks.reduce((acc, { workingTimeSeconds }) => {
    return acc + (workingTimeSeconds || 0);
  }, 0);

  const currentTimeSeconds = computeAccumulatedTimerSeconds(activeBlock?.times || null);
  return (currentTimeSeconds + pastTimeSeconds) / 3600;
};
