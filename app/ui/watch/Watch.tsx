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
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-8 -mx-8">
      <Timer timer={timer} />
      <div className="join grid grid-cols-2 w-64 m-auto">
        {isRunning ? (
          <PauseButton handlePause={handlePause} isLoading={isLoading} />
        ) : (
          <StartButton handleStart={handleStart} isLoading={isLoading} />
        )}
        <StopButton handleStop={handleStop} timer={timer} isLoading={isLoading} />
      </div>
    </div>
  );
};

const PauseButton: React.FC<{ handlePause: () => void; isLoading: boolean }> = ({ handlePause, isLoading }) => {
  return (
    <button
      className="btn btn-warning join-item  flex gap-2 items-center text-[#3f2e0e]"
      onClick={handlePause}
      disabled={isLoading}
    >
      Pause
      <FaPause />
    </button>
  );
};

const StopButton: React.FC<{ handleStop: () => void; timer: number; isLoading: boolean }> = ({
  handleStop,
  timer,
  isLoading,
}) => {
  return (
    <button
      className="btn btn-accent join-item flex gap-2 items-center text-[#451508]"
      onClick={handleStop}
      disabled={timer === 0 || isLoading}
    >
      Stop
      <FaStop />
    </button>
  );
};

const StartButton: React.FC<{ handleStart: () => void; isLoading: boolean }> = ({ handleStart, isLoading }) => {
  return (
    <button
      className="btn btn-success join-item flex gap-1 items-center text-[#1a3224]"
      onClick={handleStart}
      disabled={isLoading}
    >
      <FaPlay /> Start
    </button>
  );
};

export default Watch;
