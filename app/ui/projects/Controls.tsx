"use client";

import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import { useDBTimer } from "@/app/lib/hooks/useDBTimer";
import { LocalTimerArray } from "@/app/lib/hooks/useLocalTimerArray";
import React, { useState } from "react";
import { FaPause, FaStop, FaPlay } from "react-icons/fa6";

type Props = {
  id: number;
  isActive: boolean;
  project: ProjectWithWorkingTimes;
  isFetching?: boolean;
};

const Controls: React.FC<Props> = ({ id, isActive, project, isFetching }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const projectsContext = useProjectsContext();
  if (!projectsContext) {
    throw new Error("Projects context is not set");
  }

  const {
    contextObject: { isRunning },
  } = projectsContext;

  const { handleDBStart, handleDBPause, handleDBStop } = useDBTimer();

  const handleStart = async () => {
    setIsSubmitting(true);
    await handleDBStart(project);
    setIsSubmitting(false);
  };

  const handlePause = async () => {
    setIsSubmitting(true);
    const startTimeId = project.activeBlock?.startTimes?.slice(-1)[0]?.id;
    console.log(project.activeBlock?.startTimes);
    console.log(startTimeId);
    if (!startTimeId) return console.error("No start time found");
    await handleDBPause(startTimeId);
    setIsSubmitting(false);
  };

  const handleStop = async () => {
    setIsSubmitting(true);
    await handleDBStop(project.id);
    setIsSubmitting(false);
  };

  return (
    <div className="flex gap-1">
      <button
        disabled={isRunning[id] || isSubmitting || isFetching}
        onClick={handleStart}
        className={"text-success cursor-pointer disabled:opacity-20 disabled:cursor-auto"}
      >
        <FaPlay />
      </button>
      <button
        disabled={!isRunning[id] || isSubmitting || isFetching}
        onClick={handlePause}
        className={"text-warning cursor-pointer disabled:opacity-20 disabled:cursor-auto"}
      >
        <FaPause />
      </button>
      <button
        disabled={!isActive || isSubmitting || isFetching}
        onClick={handleStop}
        className={"text-accent cursor-pointer disabled:opacity-20 disabled:cursor-auto"}
      >
        <FaStop />
      </button>
    </div>
  );
};

export default Controls;
