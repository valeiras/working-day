"use client";
import React, { useRef, useState } from "react";
import FirstClickModal from "./FirstClickModal";
import Watch from "./Watch";

const LocalStopwatch: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const firstClickModalRef = useRef<HTMLDialogElement>(null);

  const handleStart = () => {
    if (isFirstClick) {
      firstClickModalRef.current?.showModal();
      setIsFirstClick(false);
    } else {
      startTimer();
    }
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);
  };

  const handlePause = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
  };

  return (
    <>
      <Watch
        timer={timer}
        isRunning={isRunning}
        handleStart={handleStart}
        handlePause={handlePause}
        handleStop={resetTimer}
      />
      <FirstClickModal startTimer={startTimer} ref={firstClickModalRef} />
    </>
  );
};

export default LocalStopwatch;
