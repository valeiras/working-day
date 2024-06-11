"use client";

import { useProjectsContext } from "@/app/(landing)/projects/context";
import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { id: number; totalTimersCs: Record<number, number> };

const TotalTime: React.FC<Props> = ({ id, totalTimersCs }) => {
  const { hours, minutes, seconds } = formatTime(totalTimersCs?.[id] || 0);
  return <>{`${hours}:${minutes}:${seconds}`}</>;
};

export default TotalTime;
