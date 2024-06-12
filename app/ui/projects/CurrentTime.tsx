"use client";

import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { id: number; currentTimersCs: Record<number, number> };

const CurrentTime: React.FC<Props> = ({ id, currentTimersCs }) => {
  const { hours, minutes, seconds } = formatTime(currentTimersCs?.[id] || 0);
  return <>{`${hours}:${minutes}:${seconds}`}</>;
};

export default CurrentTime;
