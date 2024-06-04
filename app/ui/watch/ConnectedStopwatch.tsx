"use client";
import React, { useEffect, useRef, useState } from "react";
import Watch from "./Watch";
import { addStartTime, addStopTime, createNewBlock, setActiveBlock } from "@/app/lib/actions";

type Props = { projectId: number | null };
const ConnectedStopwatch: React.FC<Props> = ({ projectId }) => {
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeBlockIdRef = useRef<number | null>(null);
  const startTimeIdRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (!projectId) return;
      const res = await fetch(`/api/v1/projects/${projectId}`);
      const { data, error } = await res.json();
      if (error) return;

      console.log(data);
      // The current project is running if it is active and the last start time has no stop time
      const isProjectRunning =
        data.activeBlock !== null && data.activeBlock.startTimes.slice(-1)[0].stopTimes.length === 0;
      const projectTimer = computeTimer(data?.activeBlock?.startTimes);
      console.log("isProjectRunninc: ", isProjectRunning);
      console.log("project timer: ", projectTimer);

      if (isProjectRunning) {
        activeBlockIdRef.current = data.activeBlock.id;
        startTimeIdRef.current = data.activeBlock.startTimes.slice(-1)[0].id;
        intervalRef.current = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 10);
      }

      setIsRunning(isProjectRunning);
      setTimer(projectTimer);
    };

    fetchData();
  }, [projectId]);

  const handleStart = async () => {
    if (isRunning) return;
    if (!projectId) return console.error("Project ID is missing");

    if (!activeBlockIdRef.current) {
      const { data, error } = await createNewBlock({ projectId });
      if (error || !data) return console.error(error);
      activeBlockIdRef.current = data.id;
      await setActiveBlock({ projectId, blockId: data.id });
    }

    const { data, error } = await addStartTime({ blockId: activeBlockIdRef.current });
    if (error || !data) return console.error(error);
    startTimeIdRef.current = data.id;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);
  };

  const handlePause = async () => {
    if (!isRunning) return;
    if (!startTimeIdRef.current) return console.error("Start time id is missing");

    const { data, error } = await addStopTime({ startTimeId: startTimeIdRef.current });
    if (error || !data) return console.error(error);
    startTimeIdRef.current = data.id;

    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
  };

  return (
    <Watch
      timer={timer}
      isRunning={isRunning}
      handleStart={handleStart}
      handlePause={handlePause}
      resetTimer={resetTimer}
    />
  );
};

const computeTimer = (startTimes: { time: string; stopTimes: { time: string }[] }[] | null) => {
  if (!startTimes) return 0;
  return startTimes.reduce((acc, curr) => {
    const stopTime = curr.stopTimes.length === 0 ? new Date().toISOString() : curr.stopTimes.slice(-1)[0].time;
    const startTime = curr.time;
    const diff = new Date(stopTime).getTime() - new Date(startTime).getTime();
    // The timer cumulates 10 milliseconds intervals
    return acc + diff / 10;
  }, 0);
};

export default ConnectedStopwatch;
