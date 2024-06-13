"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import useLocalTimerArray from "@/app/lib/hooks/useLocalTimerArray";
import { getAllTimers } from "@/app/lib/getTimers";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";

type Props = { columns: ProjectColumns[] };

const ProjectsList: React.FC<Props> = ({ columns }) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
  });

  const projects = data?.data;

  const localTimerArray = useLocalTimerArray();
  const {
    setCurrentTimersCs,
    setTotalTimersCs,
    setInitialTimesMs,
    setTotalInitialTimesMs,
    setIsRunning,
    setIsActive,
    intervalRef,
    createInterval,
    isRunning: isRunningLocal,
  } = localTimerArray;

  useEffect(() => {
    if (!projects) return;
    const { currentTimersCs, totalTimersCs, currentInitialMs, totalInitialMs, isRunning, isActive } = getAllTimers({
      projects,
    });
    if (intervalRef.current) clearInterval(intervalRef.current);

    // console.log({ currentTimersCs });
    // console.log({ totalTimersCs });
    // console.log({ currentInitialMs });
    // console.log({ totalInitialMs });
    console.log({ isRunningLocal });
    console.log({ isRunning });
    setCurrentTimersCs(currentTimersCs);
    setTotalTimersCs(totalTimersCs);
    setInitialTimesMs(currentInitialMs);
    setTotalInitialTimesMs(totalInitialMs);
    setIsRunning(isRunning);
    setIsActive(isActive);

    intervalRef.current = setInterval(() => {
      createInterval({
        currInitialTimes: currentInitialMs,
        currIsRunning: isRunning,
        totalInitialTimes: totalInitialMs,
        totalTimers: totalTimersCs,
        currentTimers: currentTimersCs,
      });
    }, 10);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <ProjectsContextProvider>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-64"></div>
          <div className="skeleton h-4 w-60"></div>
        </div>
      ) : (
        projects?.map((project, idx) => {
          return (
            <ProjectRow
              key={project.id}
              project={project}
              columns={columns}
              idx={idx}
              isFetching={isFetching}
              localTimerArray={localTimerArray}
            />
          );
        })
      )}
    </ProjectsContextProvider>
  );
};

export default ProjectsList;
