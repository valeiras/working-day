import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { timer: number; isLoading?: boolean };

const Timer: React.FC<Props> = ({ timer, isLoading = false }) => {
  const { hours, minutes, seconds } = formatTime(timer);
  return (
    <div className="flex justify-center text-6xl w-64">
      <div className={`text-left ${isLoading ? "opacity-50" : ""}`}>{`${hours}:${minutes}:${seconds}`}</div>
    </div>
  );
};

export default Timer;
