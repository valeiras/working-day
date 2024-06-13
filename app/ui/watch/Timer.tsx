import { formatTime } from "@/app/lib/utils";
import React from "react";

type Props = { timer: number };

const Timer: React.FC<Props> = ({ timer }) => {
  const { hours, minutes, seconds } = formatTime(timer);
  return (
    <div className="flex justify-center text-4xl min-[420px]:text-5xl sm:text-6xl">
      <div className="text-left w-44 min-[420px]:w-52 sm:w-64">{`${hours}:${minutes}:${seconds}`}</div>
    </div>
  );
};

export default Timer;
