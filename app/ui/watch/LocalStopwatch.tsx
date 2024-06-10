"use client";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Watch from "./Watch";
import Link from "next/link";
import { useLocalTimer } from "@/app/lib/hooks";

const LocalStopwatch: React.FC = () => {
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);

  const { handleLocalStart, handleLocalPause, handleLocalStop, localTimer, isRunning } = useLocalTimer();

  return (
    <Watch
      timer={localTimer}
      isRunning={isRunning}
      StartButton={
        <StartButton handleStart={handleLocalStart} isFirstClick={isFirstClick} setIsFirstClick={setIsFirstClick} />
      }
      handlePause={handleLocalPause}
      handleStop={handleLocalStop}
    />
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
      className="btn btn-success join-item flex gap-2 items-center text-[#1a3224]"
      onClick={() => {
        setIsFirstClick(false);
      }}
    >
      Start
      <FaPlay />
    </Link>
  ) : (
    <button className="btn btn-success join-item gap-2 items-center text-[#1a3224]" onClick={handleStart}>
      Start
      <FaPlay />
    </button>
  );
};

export default LocalStopwatch;
