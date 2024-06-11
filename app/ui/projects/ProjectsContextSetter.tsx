"use client";

import { useProjectsContext } from "@/app/(landing)/projects/context";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import { computeAccumulatedTimerCs } from "@/app/lib/utils";
import React, { useEffect } from "react";

type Props = { projects: ProjectWithWorkingTimes[] | null };

const ProjectsContextSetter: React.FC<Props> = ({ projects }) => {
  const { setCurrentTimersCs, setTotalTimersCs, setIsRunning, intervalRef } = useProjectsContext()!;

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

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
        activeBlockWithWorkingTimes.startTimes?.slice(-1)[0]?.stopTimes?.length === 0;

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

    setCurrentTimersCs(currentTimersCs);
    setTotalTimersCs(totalTimersCs);
    setIsRunning(isRunning);

    intervalRef.current = setInterval(() => {
      projects?.forEach(({ id }) => {
        if (isRunning[id]) {
          currentTimersCs[id] = (Date.now() - currentInitialMs[id]) / 10;
          totalTimersCs[id] = (Date.now() - totalInitialMs[id]) / 10;
        }
      });
      setCurrentTimersCs({ ...currentTimersCs });
      setTotalTimersCs({ ...totalTimersCs });
    }, 10);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intervalRef, projects, setCurrentTimersCs, setIsRunning, setTotalTimersCs]);

  return null;
};

export default ProjectsContextSetter;
