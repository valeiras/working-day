"use client";

import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import { useDBTimer } from "@/app/lib/hooks";
import { LocalTimerArray } from "@/app/lib/hooks/useLocalTimerArray";
import { cn } from "@/app/lib/utils";
import React from "react";
import { FaPause, FaStop, FaPlay } from "react-icons/fa6";

type Props = {
  id: number;
  project: ProjectWithWorkingTimes;
  isFetching?: boolean;
  localTimerArray: LocalTimerArray;
  className?: string;
};

const Controls: React.FC<Props> = ({ id, project, isFetching, localTimerArray, className }) => {
  const { isSubmitting, setIsSubmitting, setLastSubmittedProjectId } = useProjectsContext()!;

  const { isRunning, handleLocalStart, handleLocalPause, handleLocalStop, isActive } = localTimerArray;

  const { handleDBStart, handleDBPause, handleDBStop } = useDBTimer();

  const handleStart = async () => {
    setIsSubmitting(true);
    setLastSubmittedProjectId(id);
    handleLocalStart(id);
    await handleDBStart(project);
    setIsSubmitting(false);
  };

  const handlePause = async () => {
    setIsSubmitting(true);
    setLastSubmittedProjectId(id);
    handleLocalPause(id);
    // Start times do not come ordered from the DB: the greatest one is guaranteed to be the most recent
    const startTimeId = project.activeBlock?.startTimes?.reduce((acc, { id }) => (id > acc ? id : acc), 0);
    if (!startTimeId) return console.error("No start time found");
    await handleDBPause(startTimeId);
    setIsSubmitting(false);
  };

  const handleStop = async () => {
    setIsSubmitting(true);
    setLastSubmittedProjectId(id);
    handleLocalStop(id);
    // Start times do not come ordered from the DB: the greatest one is guaranteed to be the most recent
    const startTimeId = project.activeBlock?.startTimes?.reduce((acc, { id }) => (id > acc ? id : acc), 0);
    if (!startTimeId) return console.error("No start time found");
    if (isRunning[id]) await handleDBPause(startTimeId, false);
    await handleDBStop(project.id);
    setIsSubmitting(false);
  };

  return (
    <span className={cn("flex gap-1", className)}>
      <button
        disabled={isRunning[id] || isSubmitting || isFetching}
        onClick={handleStart}
        className={"text-success cursor-pointer disabled:opacity-20 disabled:cursor-auto transition-all duration-500"}
      >
        <FaPlay />
      </button>
      <button
        disabled={!isRunning[id] || isSubmitting || isFetching}
        onClick={handlePause}
        className={"text-warning cursor-pointer disabled:opacity-20 disabled:cursor-auto transition-all duration-500"}
      >
        <FaPause />
      </button>
      <button
        disabled={!isActive[id] || isSubmitting || isFetching}
        onClick={handleStop}
        className={"text-accent cursor-pointer disabled:opacity-20 disabled:cursor-auto transition-all duration-500"}
      >
        <FaStop />
      </button>
    </span>
  );
};

export default Controls;
