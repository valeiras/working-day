"use client";

import React, { useEffect, useRef, useState } from "react";
import Watch from "./Watch";
import { addStartTime, addStopTime, createNewBlock, setActiveBlock } from "@/app/lib/actions";
import { FaPlay } from "react-icons/fa";
import { useLocalTimer } from "@/app/lib/hooks";
import { ProjectWithActiveBlock, StartTimes } from "@/app/lib/db/queries";
import { PostgrestError } from "@supabase/postgrest-js";
import { computeAccumulatedTimerCs } from "./../../lib/utils";

type Props = { projectId: number | null };
const ConnectedStopwatch: React.FC<Props> = ({ projectId }) => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const activeBlockIdRef = useRef<number | null>(null);
  const startTimeIdRef = useRef<number | null>(null);

  const {
    handleLocalStart,
    handleConnectedStart,
    handleLocalPause,
    handleLocalStop,
    localTimerCs,
    setLocalTimerCs,
    isRunning,
    setIsRunning,
    intervalRef,
  } = useLocalTimer();

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;
      const res = await fetch(`/api/v1/projects/${projectId}`);
      const { data, error } = (await res.json()) as {
        data: ProjectWithActiveBlock | null;
        error?: PostgrestError | null;
      };
      if (error || !data) return;

      // The current project is running if it is active and the last start time has no stop time
      const isProjectRunning =
        data.activeBlock !== null && data.activeBlock.startTimes?.slice(-1)[0]?.stopTimes?.length === 0;
      const projectTimerCs = computeAccumulatedTimerCs(data?.activeBlock?.startTimes || null);

      activeBlockIdRef.current = data.activeBlock?.id || null;
      if (isProjectRunning) {
        startTimeIdRef.current = data.activeBlock?.startTimes?.slice(-1)[0]?.id || null;
        handleConnectedStart(projectTimerCs);
      }

      setIsRunning(isProjectRunning);
      setLocalTimerCs(projectTimerCs);
      setIsFetching(false);
    };

    setIsFetching(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleStart = () => {
    if (isRunning) return;
    if (!projectId) {
      alert("Select a project first");
      return console.error("Project ID is missing");
    }

    handleLocalStart();
    handleDBStart();
  };

  const handleDBStart = async () => {
    if (!projectId) return console.error("Project ID is missing");

    if (!activeBlockIdRef.current) {
      const { data, error } = await createNewBlock({ projectId });
      if (error || !data) return console.error(error);
      activeBlockIdRef.current = data.id;
      await setActiveBlock({ projectId, blockId: data.id });
    }
    const { data, error } = await addStartTime({ blockId: activeBlockIdRef.current });
    if (error || !data) return console.error(error);
    startTimeIdRef.current = data.id;
  };

  const handlePause = () => {
    if (!isRunning) return;
    if (!startTimeIdRef.current) return console.error("Start time id is missing");
    handleLocalPause();

    addStopTime({ startTimeId: startTimeIdRef.current });
    startTimeIdRef.current = null;
  };

  const handleStop = () => {
    if (!projectId) return console.error("Project ID is missing");

    if (isRunning) handlePause();
    handleLocalStop();

    setActiveBlock({ projectId, blockId: null });
    activeBlockIdRef.current = null;
  };

  return (
    <Watch
      timer={localTimerCs}
      isRunning={isRunning}
      StartButton={<StartButton handleStart={handleStart} />}
      handlePause={handlePause}
      handleStop={handleStop}
      modalMessage="The current block will be stopped and stored in the database."
      isLoading={isFetching}
    />
  );
};

const StartButton: React.FC<{ handleStart: () => void }> = ({ handleStart }) => {
  return (
    <button className="btn btn-success join-item flex gap-1 items-center text-[#1a3224]" onClick={handleStart}>
      <FaPlay /> Start
    </button>
  );
};

export default ConnectedStopwatch;
