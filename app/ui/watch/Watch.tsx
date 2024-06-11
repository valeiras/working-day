"use client";

import React from "react";
import { Timer } from "@/app/ui";
import { FaPause, FaStop, FaPlay } from "react-icons/fa6";

type Props = {
  timer: number;
  isRunning: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleStop: () => void;
  modalMessage?: string;
  isLoading?: boolean;
};

const Watch: React.FC<Props> = ({ timer, isRunning, handleStart, handlePause, handleStop, isLoading = false }) => {
  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <Timer timer={timer} isLoading={isLoading} />
      <div className="join grid grid-cols-2">
        {isRunning ? <PauseButton handlePause={handlePause} /> : <StartButton handleStart={handleStart} />}
        <StopButton handleStop={handleStop} timer={timer} />
      </div>
    </div>
  );
};

const PauseButton: React.FC<{ handlePause: () => void }> = ({ handlePause }) => {
  return (
    <button className="btn btn-warning join-item  flex gap-2 items-center text-[#3f2e0e]" onClick={handlePause}>
      Pause
      <FaPause />
    </button>
  );
};

const StopButton: React.FC<{ handleStop: () => void; timer: number }> = ({ handleStop, timer }) => {
  return (
    <button
      className="btn btn-accent join-item flex gap-2 items-center text-[#451508]"
      onClick={handleStop}
      disabled={timer === 0}
    >
      Stop
      <FaStop />
    </button>
  );
};

const StartButton: React.FC<{ handleStart: () => void }> = ({ handleStart }) => {
  return (
    <button className="btn btn-success join-item flex gap-1 items-center text-[#1a3224]" onClick={handleStart}>
      <FaPlay /> Start
    </button>
  );
};

export default Watch;
