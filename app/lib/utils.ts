import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StartAndPauseTimes } from "./db/queries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const computeAccumulatedTimerCs = (startAndPauseTimes: StartAndPauseTimes) => {
  if (!startAndPauseTimes) return 0;
  return startAndPauseTimes.reduce((acc, curr) => {
    const pauseTime = curr?.pauseTime || new Date().toISOString();
    const diff = new Date(pauseTime).getTime() - new Date(curr.startTime).getTime();
    // The timer cumulates 10 milliseconds intervals (i.e. 1cs time)
    return acc + diff / 10;
  }, 0);
};

export const computeAccumulatedTimerSeconds = (startAndPauseTimes: StartAndPauseTimes) => {
  if (!startAndPauseTimes) return 0;
  return startAndPauseTimes.reduce((acc, curr) => {
    const pauseTime = curr?.pauseTime || new Date().toISOString();
    const diff = new Date(pauseTime).getSeconds() - new Date(curr.startTime).getSeconds();
    return acc + diff;
  }, 0);
};

export const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

export const shortenDate = (value: string) => {
  return value.substring(0, 5);
};

export const shortenTick = (value: string) => {
  return value.substring(0, 7) + (value.length > 8 ? "..." : "");
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
