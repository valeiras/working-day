"use client";

import { ProjectsContextObject, useProjectsContext } from "@/app/contexts/ProjectsContext";
import { computeAccumulatedTimerCs } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { getAllProjects } from "../lib/actions";
import { ProjectWithWorkingTimes } from "./db/queries";

const setProjectContext = ({
  projects,
  intervalRef,
  setContextObject,
}: {
  projects: ProjectWithWorkingTimes[];
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
  setContextObject: Dispatch<SetStateAction<ProjectsContextObject>>;
}) => {
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

  setContextObject((prev) => ({
    ...prev,
    projects,
    currentTimersCs,
    totalTimersCs,
    isRunning,
  }));

  intervalRef.current = setInterval(() => {
    projects?.forEach(({ id }) => {
      if (isRunning[id]) {
        currentTimersCs[id] = (Date.now() - currentInitialMs[id]) / 10;
        totalTimersCs[id] = (Date.now() - totalInitialMs[id]) / 10;
      }
    });
    setContextObject((prev) => ({
      ...prev,
      currentTimersCs,
      totalTimersCs,
    }));
  }, 10);
};

export default setProjectContext;
