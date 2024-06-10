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

const formatTime = (timer: number) => {
  const hours = Math.floor(timer / 360000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timer / 6000) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timer / 100) % 60)
    .toString()
    .padStart(2, "0");
  const milliseconds = (timer % 100).toString().padStart(3, "0");

  return { hours, minutes, seconds, milliseconds };
};

export default Timer;
