"use client";

import React, { useRef } from "react";
import { Timer, ConfirmationModal } from "@/app/ui";

type Props = {
  timer: number;
  isRunning: boolean;
  handleStart: () => void;
  handlePause: () => void;
  handleStop: () => void;
};
const Watch: React.FC<Props> = ({ timer, isRunning, handleStart, handlePause, handleStop }) => {
  const confirmResetModalRef = useRef<HTMLDialogElement>(null);

  const handleStopClick = () => {
    confirmResetModalRef.current?.showModal();
  };

  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <Timer timer={timer} />
      <div className="join grid grid-cols-2">
        {isRunning ? <PauseButton handlePause={handlePause} /> : <StartButton handleStart={handleStart} />}
        <StopButton handleClick={handleStopClick} timer={timer} />
      </div>
      <ConfirmationModal
        ref={confirmResetModalRef}
        handleClick={handleStop}
        title="Are you sure you want to stop?"
        message="The watch will be set to 0"
        buttonText="Yes"
      />
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
    <button className="btn btn-warning join-item" onClick={handlePause}>
      Pause
    </button>
  );
};

const StopButton: React.FC<{ handleClick: () => void; timer: number }> = ({ handleClick, timer }) => {
  return (
    <button className="btn btn-accent join-item" onClick={handleClick} disabled={timer === 0}>
      Stop
    </button>
  );
};

export default Watch;
