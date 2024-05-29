"use client";
import React, { useRef, useState } from "react";
import Timer from "./Timer";
import FirstClickModal from "./FirstClickModal";

const Stopwatch: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleStart = () => {
    if (isFirstClick) {
      modalRef.current?.showModal();
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

  const handleReset = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimer(0);
  };

  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <Timer timer={timer} />
      <div className="join grid grid-cols-2">
        {isRunning ? <PauseButton handlePause={handlePause} /> : <StartButton handleStart={handleStart} />}
        <ResetButton handleReset={handleReset} />
      </div>
      <FirstClickModal ref={modalRef} startTimer={startTimer} />
    </div>
  );
};

const StartButton: React.FC<{ handleStart: () => void }> = ({ handleStart }) => {
  return (
    <button className="btn btn-success join-item" onClick={handleStart}>
      Start
    </button>
  );
};

const PauseButton: React.FC<{ handlePause: () => void }> = ({ handlePause }) => {
  return (
    <button className="btn btn-accent join-item" onClick={handlePause}>
      Stop
    </button>
  );
};

const ResetButton: React.FC<{ handleReset: () => void }> = ({ handleReset }) => {
  return (
    <button className="btn btn-secondary join-item" onClick={handleReset}>
      Reset
    </button>
  );
};
export default Stopwatch;
