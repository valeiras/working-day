"use client";

import React, { useEffect } from "react";
import { addStartTime, addPauseTime, createNewBlock, getAllProjects, setActiveBlock } from "@/app/lib/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Watch from "./Watch";
import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import { useLocalTimer } from "@/app/lib/hooks";
import { useDBTimer } from "@/app/lib/hooks/useDBTimer";

type Props = { projectId: number | null };
const ConnectedStopwatch: React.FC<Props> = ({ projectId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    staleTime: 10 * 1000,
  });

  const projects = data?.data || [];
  const currProject = projects.find((project) => project.id === projectId);

  const projectsContext = useProjectsContext();
  if (!projectsContext) {
    throw new Error("Projects context is not set");
  }

  const {
    handleLocalStart,
    handleConnectedStart,
    handleLocalPause,
    handleLocalStop,
    localTimerCs,
    setLocalTimerCs,
    isRunning,
    setIsRunning,
    intervalRef,
  } = useLocalTimer();

  const { handleDBStart, handleDBPause, handleDBStop } = useDBTimer();

  const {
    contextObject: { currentTimersCs, isRunning: isRunningFromContext },
  } = projectsContext;

  useEffect(() => {
    if (!projectId) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isRunningFromContext[projectId]) {
      handleConnectedStart(currentTimersCs[projectId]);
    }

    setIsRunning(isRunningFromContext[projectId]);
    setLocalTimerCs(currentTimersCs[projectId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleStart = () => {
    if (isRunning) return;
    if (!projectId || !currProject) {
      alert("Select a project first");
      return console.error("Project ID is missing");
    }

    handleLocalStart();
    handleDBStart(currProject);
  };

  const handlePause = async () => {
    if (!projectId) return console.error("Project ID is missing");

    const startTimeId = currProject?.activeBlock?.startTimes?.[0]?.id;
    if (!startTimeId) return console.error("Start time id is missing");
    handleLocalPause();
    handleDBPause(startTimeId);
  };

  const handleStop = async () => {
    if (!projectId) return console.error("Project ID is missing");
    if (isRunning) handlePause();
    handleLocalStop();
    handleDBStop(projectId);
  };

  return (
    <Watch
      timer={localTimerCs}
      isRunning={isRunning}
      handleStart={handleStart}
      handlePause={handlePause}
      handleStop={handleStop}
      modalMessage="The current block will be stopped and stored in the database."
      isLoading={isLoading}
    />
  );
};

export default ConnectedStopwatch;
