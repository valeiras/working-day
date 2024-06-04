import React, { useRef } from "react";
import Timer from "./Timer";
import ConfirmResetModal from "./ConfirmResetModal";

type Props = {
  timer: number;
  isRunning: boolean;
  handleStart: () => void;
  handlePause: () => void;
  resetTimer: () => void;
};
const Watch: React.FC<Props> = ({ timer, isRunning, handleStart, handlePause, resetTimer }) => {
  const confirmResetModalRef = useRef<HTMLDialogElement>(null);

  const handleReset = () => {
    confirmResetModalRef.current?.showModal();
  };

  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <Timer timer={timer} />
      <div className="join grid grid-cols-2">
        {isRunning ? <PauseButton handlePause={handlePause} /> : <StartButton handleStart={handleStart} />}
        <ResetButton handleReset={handleReset} />
      </div>
      <ConfirmResetModal ref={confirmResetModalRef} resetTimer={resetTimer} />
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

export default Watch;
