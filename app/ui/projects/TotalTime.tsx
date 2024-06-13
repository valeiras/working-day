"use client";

import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { id: number; totalTimersCs: Record<number, number>; isFetching?: boolean };

const TotalTime: React.FC<Props> = ({ id, totalTimersCs, isFetching }) => {
  const { isSubmitting } = useProjectsContext()!;
  const { hours, minutes, seconds } = formatTime(totalTimersCs?.[id] || 0);
  return (
    <span
      className={`transition-all ${(isSubmitting || isFetching) && "opacity-90"}`}
    >{`${hours}:${minutes}:${seconds}`}</span>
  );
};

export default TotalTime;
