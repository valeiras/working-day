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

      // The current project is running if it is active and the last start time has no stop time
      const isProjectRunning =
        data.activeBlock !== null && data.activeBlock.startTimes.slice(-1)[0].stopTimes.length === 0;
      const projectTimer = computeTimer(data?.activeBlock?.startTimes);

      console.log(data);
      console.log("is project running: ", isProjectRunning);
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

  const handleStart = () => {
    if (isRunning) return;
    if (!projectId) {
      alert("Select a project first");
      return console.error("Project ID is missing");
    }

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);

    handleDBStart();
  };

  const handleDBStart = async () => {
    if (!projectId) return;

    if (!activeBlockIdRef.current) {
      const { data, error } = await createNewBlock({ projectId });
      if (error || !data) return console.error(error);
      activeBlockIdRef.current = data.id;
      await setActiveBlock({ projectId, blockId: data.id });
    }
    const { data, error } = await addStartTime({ blockId: activeBlockIdRef.current });
    if (error || !data) return console.error(error);
    startTimeIdRef.current = data.id;
  };

  const handlePause = () => {
    if (!isRunning) return;
    if (!startTimeIdRef.current) return console.error("Start time id is missing");
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    addStopTime({ startTimeId: startTimeIdRef.current });
    startTimeIdRef.current = null;
  };

  const handleStop = () => {
    if (!projectId) return console.error("Project ID is missing");
    setIsRunning(false);

    if (isRunning) {
      if (!startTimeIdRef.current) return console.error("Start time id is missing");
      addStopTime({ startTimeId: startTimeIdRef.current });
      startTimeIdRef.current = null;
    }

    setActiveBlock({ projectId, blockId: null });
    activeBlockIdRef.current = null;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
  };

  return (
    <Watch
      timer={timer}
      isRunning={isRunning}
      StartButton={<StartButton handleStart={handleStart} />}
      handlePause={handlePause}
      handleStop={handleStop}
      modalMessage="The current block will be stopped and stored in the database."
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

const StartButton: React.FC<{ handleStart: () => void }> = ({ handleStart }) => {
  return (
    <button className="btn btn-success join-item" onClick={handleStart}>
      Start
    </button>
  );
};

export default ConnectedStopwatch;
