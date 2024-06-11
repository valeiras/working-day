"use client";

import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { id: number };

const CurrentTime: React.FC<Props> = ({ id }) => {
  const projectsContext = useProjectsContext();
  if (!projectsContext) {
    throw new Error("Projects context is not set");
  }

  const {
    contextObject: { currentTimersCs },
  } = projectsContext;

  const { hours, minutes, seconds } = formatTime(currentTimersCs?.[id] || 0);
  return <>{`${hours}:${minutes}:${seconds}`}</>;
};

export default CurrentTime;