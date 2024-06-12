import { useRef, useState } from "react";

const useLocalTimerArray = () => {
  const [localTimersCs, setLocalTimersCs] = useState<Record<number, number>>({});
  const [initialTimesMs, setInitialTimesMs] = useState<Record<number, number>>({});
  const [isRunning, setIsRunning] = useState<Record<number, boolean>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleConnectedStart = (timerCs: number, projectId: number) => {
    const newIsRunning = { ...isRunning, [projectId]: true };
    setIsRunning(newIsRunning);

    const newInitialTimesMs = { ...initialTimesMs, [projectId]: Date.now() - timerCs * 10 };
    setInitialTimesMs(newInitialTimesMs);

    createInterval({ currInitialTimes: newInitialTimesMs, currIsRunning: newIsRunning });
  };

  const handleLocalStart = (projectId: number) => {
    if (isRunning[projectId]) return;
    const newIsRunning = { ...isRunning, [projectId]: true };
    setIsRunning(newIsRunning);

    const currTimer = localTimersCs[projectId] || 0;
    const newInitialTimesMs = { ...initialTimesMs, [projectId]: Date.now() - currTimer * 10 };
    setInitialTimesMs(newInitialTimesMs);

    createInterval({ currInitialTimes: newInitialTimesMs, currIsRunning: newIsRunning });
  };

  const handleLocalPause = (projectId: number) => {
    if (!isRunning[projectId]) return;
    const newIsRunning = { ...isRunning, [projectId]: false };
    setIsRunning(newIsRunning);

    createInterval({ currInitialTimes: initialTimesMs, currIsRunning: newIsRunning });
  };

  const handleLocalStop = (projectId: number) => {
    if (!isRunning[projectId]) return;
    const newIsRunning = { ...isRunning, [projectId]: false };
    setIsRunning(newIsRunning);

    const newLocalTimersCs = { ...localTimersCs, [projectId]: 0 };
    setLocalTimersCs(newLocalTimersCs);

    createInterval({ currInitialTimes: initialTimesMs, currIsRunning: newIsRunning });
  };

  const createInterval = ({
    currInitialTimes,
    currIsRunning,
  }: {
    currInitialTimes: Record<number, number>;
    currIsRunning: Record<number, boolean>;
  }) => {
    const newLocalTimersCs = { ...localTimersCs };

    Object.entries(currInitialTimes).forEach(([id, time]) => {
      if (currIsRunning[parseInt(id)]) {
        newLocalTimersCs[parseInt(id)] = (Date.now() - time) / 10;
      }
    });

    intervalRef.current = setInterval(() => {
      setLocalTimersCs(newLocalTimersCs);
    }, 10);
  };

  return {
    handleLocalStart,
    handleConnectedStart,
    handleLocalPause,
    handleLocalStop,
    localTimersCs,
    setLocalTimersCs,
    isRunning,
    setIsRunning,
    intervalRef,
  };
};
export default useLocalTimerArray;
