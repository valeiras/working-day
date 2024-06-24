import { ProjectWithWorkingTimes } from "./db/queries";
import { computeAccumulatedTimerSeconds, formatDate } from "./utils";

export const getWorkedHours = ({
  projects,
  initialDate,
  finalDate,
}: {
  projects: ProjectWithWorkingTimes[] | null | undefined;
  initialDate?: Date;
  finalDate?: Date;
}) => {
  const workedHours: Record<number, number> = {};

  projects?.forEach((project) => {
    workedHours[project.id] = computeHours(project);
  });

  return {
    workedHours,
  };
};

export const getWorkedHoursPerDay = ({
  projects,
  initialDate,
  finalDate,
}: {
  projects: ProjectWithWorkingTimes[] | null | undefined;
  initialDate: Date;
  finalDate: Date;
}) => {
  const workedHours: Record<string, Record<string, number>> = {};

  const emptyTimes: Record<string, number> = {};
  projects?.forEach(({ name }) => (emptyTimes[name] = 0));

  const currDate: Date = new Date(initialDate);
  while (currDate <= finalDate) {
    const dateStr = formatDate(currDate);
    workedHours[dateStr] = { ...emptyTimes };
    currDate.setDate(currDate.getDate() + 1);
  }

  projects?.forEach((project) => {
    const { workingBlocks, name } = project;
    workingBlocks.forEach(({ workingTimeSeconds, createdAt }) => {
      const creationDate = new Date(createdAt);
      if (creationDate >= initialDate && creationDate <= finalDate) {
        const dateStr = formatDate(new Date(createdAt));
        workedHours[dateStr][name] = parseFloat((workedHours[dateStr][name] + workingTimeSeconds / 3600).toFixed(2));
      }
    });
  });

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
