import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StartTimes } from "./db/queries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const computeAccumulatedTimerCs = (startTimes: StartTimes) => {
  if (!startTimes) return 0;
  return startTimes.reduce((acc, curr) => {
    const pauseTime =
      curr.pauseTimes && curr.pauseTimes.length !== 0 ? curr.pauseTimes[0].time : new Date().toISOString();
    const startTime = curr.time;
    const diff = new Date(pauseTime).getTime() - new Date(startTime).getTime();
    // The timer cumulates 10 milliseconds intervals (i.e. 1cs time)
    return acc + diff / 10;
  }, 0);
};

export const formatTime = (timerCs: number) => {
  const hours = Math.floor(timerCs / 360000)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timerCs / 6000) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timerCs / 100) % 60)
    .toString()
    .padStart(2, "0");
  const milliseconds = (timerCs % 100).toString().padStart(3, "0");

  return { hours, minutes, seconds, milliseconds };
};
