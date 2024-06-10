import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StartTimes } from "./db/queries";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const computeAcumulatedTimer = (startTimes: StartTimes) => {
  if (!startTimes) return 0;
  return startTimes.reduce((acc, curr) => {
    const stopTime =
      curr.stopTimes && curr.stopTimes.length !== 0 ? curr.stopTimes.slice(-1)[0].time : new Date().toISOString();
    const startTime = curr.time;
    const diff = new Date(stopTime).getTime() - new Date(startTime).getTime();
    // The timer cumulates 10 milliseconds intervals
    return acc + diff / 10;
  }, 0);
};

export const formatTime = (timer: number) => {
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
