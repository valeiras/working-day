"use client";

import React, { useEffect, useRef } from "react";
import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import Watch from "./Watch";
import { useDBTimer, useLocalTimer } from "@/app/lib/hooks";
import { getSingleTimer } from "@/app/lib/getTimers";
import SaveBlockModal from "../modals/SaveBlockModal";

type Props = { projectId: number | null };
const ConnectedStopwatch: React.FC<Props> = ({ projectId }) => {
  const [isStale, setIsStale] = React.useState<boolean>(false);
  const [modalTimerCs, setModalTimerCs] = React.useState<number>(0);
  const modalRef = useRef<HTMLDialogElement>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  const projects = data?.data || [];
  const currProject = projects.find((project) => project.id === projectId);

  const {
    handleLocalStart,
    handleLocalPause,
    handleLocalStop,
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
      handleLocalStart(currentTimerCs);
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

  const showModal = async () => {
    setModalTimerCs(localTimerCs);
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <Watch
        timer={localTimerCs}
        isRunning={isRunning}
        handleStart={handleStart}
        handlePause={handlePause}
        handleStop={showModal}
        modalMessage="The current block will be stopped and stored in the database."
        isLoading={isFetching || isStale || !projectId}
      />
      <SaveBlockModal
        blockId={currProject?.activeBlock?.id}
        ref={modalRef}
        currentTimerCs={modalTimerCs}
        closeModal={closeModal}
        handleLocalStop={handleLocalStop}
      />
    </>
  );
};

export default ConnectedStopwatch;
