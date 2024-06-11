"use client";

import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Watch from "./Watch";
import Link from "next/link";
import { useLocalTimer } from "@/app/lib/hooks";
import { useRouter } from "next/navigation";

const LocalStopwatch: React.FC = () => {
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);
  const router = useRouter();

  const { handleLocalStart, handleLocalPause, handleLocalStop, localTimerCs, isRunning } = useLocalTimer();

  const handleStart = () => {
    if (isFirstClick) {
      setIsFirstClick(false);
      router.push("/first-click");
    } else {
      handleLocalStart();
    }
  };

  return (
    <Watch
      timer={localTimerCs}
      isRunning={isRunning}
      handleStart={handleStart}
      handlePause={handleLocalPause}
      handleStop={handleLocalStop}
    />
  );
};

export default LocalStopwatch;
