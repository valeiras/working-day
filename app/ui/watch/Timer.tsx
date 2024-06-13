import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { timer: number };

const Timer: React.FC<Props> = ({ timer }) => {
  const { hours, minutes, seconds } = formatTime(timer);
  return (
    <div className="flex justify-center text-6xl">
      <div className={`w-64 text-left`}>{`${hours}:${minutes}:${seconds}`}</div>
    </div>
  );
};

export default Timer;
