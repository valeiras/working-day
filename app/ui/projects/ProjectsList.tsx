"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import useLocalTimerArray from "@/app/lib/hooks/useLocalTimerArray";
import { getAllTimers } from "@/app/lib/getTimers";

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
    setLocalTimersCs,
    setTotalTimersCs,
    setInitialTimesMs,
    setTotalInitialTimesMs,
    setIsRunning,
    intervalRef,
    createInterval,
  } = localTimerArray;

  useEffect(() => {
    if (!projects) return;
    const { currentTimersCs, totalTimersCs, currentInitialMs, totalInitialMs, isRunning } = getAllTimers({ projects });
    setLocalTimersCs(currentTimersCs);
    setTotalTimersCs(totalTimersCs);
    setInitialTimesMs(currentInitialMs);
    setTotalInitialTimesMs(totalInitialMs);
    setIsRunning(isRunning);

    intervalRef.current = setInterval(() => {
      createInterval({ currInitialTimes: currentInitialMs, currIsRunning: isRunning });
    }, 10);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <>
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
    </>
  );
};

export default ProjectsList;
