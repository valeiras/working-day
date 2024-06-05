"use client";
import React, { useRef, useState } from "react";
// import FirstClickModal from "./FirstClickModal";
import Watch from "./Watch";
import Link from "next/link";

const LocalStopwatch: React.FC = () => {
  const [timer, setTimer] = useState<number>(0);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
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
        StartButton={
          <StartButton handleStart={handleStart} isFirstClick={isFirstClick} setIsFirstClick={setIsFirstClick} />
        }
        handlePause={handlePause}
        handleStop={resetTimer}
      />
    </>
  );
};

const StartButton: React.FC<{
  handleStart: () => void;
  isFirstClick: boolean;
  setIsFirstClick: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ handleStart, isFirstClick, setIsFirstClick }) => {
  return isFirstClick ? (
    <Link
      href="/first-click"
      className="btn btn-success join-item"
      onClick={() => {
        setIsFirstClick(false);
      }}
    >
      Start
    </Link>
  ) : (
    <button className="btn btn-success join-item" onClick={handleStart}>
      Start
    </button>
  );
};

export default LocalStopwatch;
