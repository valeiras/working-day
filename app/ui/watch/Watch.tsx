"use client";

import React, { useRef } from "react";
import { Timer, ConfirmationModal } from "@/app/ui";

type Props = {
  timer: number;
  isRunning: boolean;
  StartButton: React.ReactNode;
  handlePause: () => void;
  handleStop: () => void;
  modalMessage?: string;
};
const Watch: React.FC<Props> = ({
  timer,
  isRunning,
  StartButton,
  handlePause,
  handleStop,
  modalMessage = "The current block will be stopped",
}) => {
  const confirmResetModalRef = useRef<HTMLDialogElement>(null);

  const handleStopClick = () => {
    confirmResetModalRef.current?.showModal();
  };

  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <Timer timer={timer} />
      <div className="join grid grid-cols-2">
        {isRunning ? <PauseButton handlePause={handlePause} /> : StartButton}
        <StopButton handleClick={handleStopClick} timer={timer} />
      </div>
      <ConfirmationModal
        ref={confirmResetModalRef}
        handleClick={handleStop}
        title="Are you sure you want to stop?"
        message={modalMessage}
        buttonText="Yes"
      />
    </div>
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
