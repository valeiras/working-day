"use client";

import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { id: number; currentTimersCs: Record<number, number>; isFetching?: boolean };

const CurrentTime: React.FC<Props> = ({ id, currentTimersCs, isFetching }) => {
  const { isSubmitting } = useProjectsContext()!;
  const { hours, minutes, seconds } = formatTime(currentTimersCs?.[id] || 0);
  return (
    <span
      className={`transition-all ${(isSubmitting || isFetching) && "opacity-90"}`}
    >{`${hours}:${minutes}:${seconds}`}</span>
  );
};

export default CurrentTime;
