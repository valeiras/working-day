"use client";

import React, { useEffect } from "react";
import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import Watch from "./Watch";
import { useDBTimer, useLocalTimer } from "@/app/lib/hooks";
import { getSingleTimer } from "@/app/lib/getTimers";
import { useRouter } from "next/navigation";

type Props = { projectId: number | null };
const ConnectedStopwatch: React.FC<Props> = ({ projectId }) => {
  const [isStale, setIsStale] = React.useState<boolean>(false);
  const router = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  const projects = data?.data || [];
  const currProject = projects.find((project) => project.id === projectId);

  const {
    handleLocalStart,
    handleConnectedStart,
    handleLocalPause,
    localTimerCs,
    setLocalTimerCs,
    isRunning,
    setIsRunning,
    intervalRef,
  } = useLocalTimer();

  const { handleDBStart, handleDBPause } = useDBTimer();

  useEffect(() => {
    if (!projectId) return;
    const { currentTimerCs, isRunning: isRunningDB } = getSingleTimer({ projects, projectId })!;

    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isRunningDB) {
      handleConnectedStart(currentTimerCs);
    }

    setIsRunning(isRunningDB);
    setLocalTimerCs(currentTimerCs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleStart = async () => {
    if (!projectId || !currProject) {
      alert("Select a project first");
      return console.error("Project ID is missing");
    }

    setIsStale(true);
    handleLocalStart();
    await handleDBStart(currProject);
    setIsStale(false);
  };

  const handlePause = async () => {
    if (!projectId) return console.error("Project ID is missing");

    setIsStale(true);
    // Start times do not come ordered from the DB: the greatest one is guaranteed to be the most recent
    const startTimeId = currProject?.activeBlock?.times?.reduce((acc, { id }) => (id > acc ? id : acc), 0);
    if (!startTimeId) return console.error("Start time id is missing");

    handleLocalPause();
    await handleDBPause(startTimeId);
    setIsStale(false);
  };

  const handleStop = async () => {
    if (!projectId) return console.error("Project ID is missing");
    if (isRunning) handlePause();
    router.push(`/save-block/${currProject?.activeBlock?.id}?t=${localTimerCs}`);
  };

  return (
    <Watch
      timer={localTimerCs}
      isRunning={isRunning}
      handleStart={handleStart}
      handlePause={handlePause}
      handleStop={handleStop}
      modalMessage="The current block will be stopped and stored in the database."
      isLoading={isFetching || isStale}
    />
  );
};

export default ConnectedStopwatch;
