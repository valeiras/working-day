"use client";

import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import { useSaveBlockContext } from "@/app/contexts/SaveBlockContext";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import { useDBTimer } from "@/app/lib/hooks";
import { LocalTimerArray } from "@/app/lib/hooks/useLocalTimerArray";
import { cn } from "@/app/lib/utils";
import React from "react";
import { FaPause, FaStop, FaPlay } from "react-icons/fa6";

type Props = {
  project: ProjectWithWorkingTimes;
  isFetching?: boolean;
  localTimerArray: LocalTimerArray;
  className?: string;
};

const Controls: React.FC<Props> = ({ project, isFetching, localTimerArray, className }) => {
  const projectId = project.id;
  const { isSubmitting, setIsSubmitting, setLastSubmittedProjectId } = useProjectsContext()!;
  const { setModalTimerCs, setModalBlockId, modalRef, handleStopRef } = useSaveBlockContext()!;

  const { isRunning, handleLocalStart, handleLocalPause, handleLocalStop, isActive, currentTimersCs } = localTimerArray;

  const { handleDBStart, handleDBPause } = useDBTimer();

  const handleStart = async () => {
    setIsSubmitting(true);
    setLastSubmittedProjectId(projectId);
    handleLocalStart(projectId);
    await handleDBStart(project);
    setIsSubmitting(false);
  };

  const handlePause = async () => {
    setIsSubmitting(true);
    setLastSubmittedProjectId(projectId);
    handleLocalPause(projectId);
    const startTimeId = project.activeBlock?.times?.[0].id;
    if (!startTimeId) return console.error("No start time found");
    await handleDBPause(startTimeId);
    setIsSubmitting(false);
  };

  const handleStop = async () => {
    setLastSubmittedProjectId(null);
    const blockId = project.activeBlock?.id;
    if (!blockId) return console.error("No block id found");

    handleStopRef.current = () => handleLocalStop(projectId);
    setModalTimerCs(currentTimersCs[projectId]);
    setModalBlockId(blockId);
    modalRef.current?.showModal();
  };

  return (
    <span className={cn("flex gap-1", className)}>
      <button
        disabled={isRunning[projectId] || isSubmitting || isFetching}
        onClick={handleStart}
        className={"text-success cursor-pointer disabled:opacity-20 disabled:cursor-auto transition-all duration-500"}
      >
        <FaPlay />
      </button>
      <button
        disabled={!isRunning[projectId] || isSubmitting || isFetching}
        onClick={handlePause}
        className={"text-warning cursor-pointer disabled:opacity-20 disabled:cursor-auto transition-all duration-500"}
      >
        <FaPause />
      </button>
      <button
        disabled={!isActive[projectId] || isSubmitting || isFetching}
        onClick={handleStop}
        className={"text-accent cursor-pointer disabled:opacity-20 disabled:cursor-auto transition-all duration-500"}
      >
        <FaStop />
      </button>
    </span>
  );
};

export default Controls;
