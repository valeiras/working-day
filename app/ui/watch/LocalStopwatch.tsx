"use client";

import React, { useRef, useState } from "react";
import Watch from "./Watch";
import { useLocalTimer } from "@/app/lib/hooks";
import FirstClickModal from "../modals/FirstClickModal";

const LocalStopwatch: React.FC = () => {
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);
  const firstClickModalRef = useRef<HTMLDialogElement>(null);

  const { handleLocalStart, handleLocalPause, handleLocalStop, localTimerCs, isRunning } = useLocalTimer();

  const handleStart = () => {
    if (isFirstClick) {
      firstClickModalRef.current?.showModal();
      setIsFirstClick(false);
    } else {
      handleLocalStart();
    }
  };

  return (
    <>
      <Watch
        timer={localTimerCs}
        isRunning={isRunning}
        handleStart={handleStart}
        handlePause={handleLocalPause}
        handleStop={handleLocalStop}
      />
      <FirstClickModal startTimer={handleLocalStart} ref={firstClickModalRef} />
    </>
  );
};

export default LocalStopwatch;
