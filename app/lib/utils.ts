import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StartAndPauseTimes } from "./db/queries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const computeAccumulatedTimerCs = (startAndPauseTimes: StartAndPauseTimes) => {
  if (!startAndPauseTimes) return 0;
  return startAndPauseTimes.reduce((acc, curr) => {
    const pauseTime = curr?.pauseTime || new Date().toISOString();
    const diff = new Date(pauseTime).getTime() - new Date(curr.startTime).getTime();
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
