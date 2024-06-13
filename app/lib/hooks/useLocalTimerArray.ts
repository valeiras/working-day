import { useRef, useState } from "react";

export type LocalTimerArray = {
  handleLocalStart: (projectId: number) => void;
  handleLocalPause: (projectId: number) => void;
  handleLocalStop: (projectId: number) => void;
  currentTimersCs: Record<number, number>;
  setCurrentTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  totalTimersCs: Record<number, number>;
  setTotalTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setTotalInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  isRunning: Record<number, boolean>;
  setIsRunning: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  isActive: Record<number, boolean>;
  setIsActive: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  createInterval: (params: {
    currInitialTimes: Record<number, number>;
    totalInitialTimes: Record<number, number>;
    currIsRunning: Record<number, boolean>;
    totalTimers: Record<number, number>;
    currentTimers: Record<number, number>;
  }) => void;
};

const useLocalTimerArray: () => LocalTimerArray = () => {
  const [currentTimersCs, setCurrentTimersCs] = useState<Record<number, number>>({});
  const [totalTimersCs, setTotalTimersCs] = useState<Record<number, number>>({});
  const [initialTimesMs, setInitialTimesMs] = useState<Record<number, number>>({});
  const [totalInitialTimesMs, setTotalInitialTimesMs] = useState<Record<number, number>>({});
  const [isRunning, setIsRunning] = useState<Record<number, boolean>>({});
  const [isActive, setIsActive] = useState<Record<number, boolean>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLocalStart = (projectId: number) => {
    // if (isRunning[projectId]) return;
    const newIsRunning = { ...isRunning, [projectId]: true };
    console.log({ newIsRunning });
    setIsRunning(newIsRunning);
    setIsActive({ ...isActive, [projectId]: true });

    const currTimer = currentTimersCs[projectId] || 0;
    const newInitialTimesMs = { ...initialTimesMs, [projectId]: Date.now() - currTimer * 10 };
    setInitialTimesMs(newInitialTimesMs);
  };

  const handleLocalPause = (projectId: number) => {
    if (!isRunning[projectId]) return;
    const newIsRunning = { ...isRunning, [projectId]: false };
    setIsRunning(newIsRunning);
  };

  const handleLocalStop = (projectId: number) => {
    if (!isActive[projectId]) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const newIsRunning = { ...isRunning, [projectId]: false };
    setIsRunning(newIsRunning);
    setIsActive({ ...isActive, [projectId]: false });

    const newCurrentTimersCs = { ...currentTimersCs, [projectId]: 0 };
    setCurrentTimersCs(newCurrentTimersCs);
  };

  const createInterval = ({
    currInitialTimes,
    totalInitialTimes,
    totalTimers,
    currentTimers,
    currIsRunning,
  }: {
    currInitialTimes: Record<number, number>;
    totalInitialTimes: Record<number, number>;
    totalTimers: Record<number, number>;
    currentTimers: Record<number, number>;
    currIsRunning: Record<number, boolean>;
  }) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const newCurrentTimersCs = { ...currentTimers };
      const newTotalTimersCs = { ...totalTimers };

      Object.entries(currInitialTimes).forEach(([id, time]) => {
        if (currIsRunning[parseInt(id)]) {
          newCurrentTimersCs[parseInt(id)] = (Date.now() - time) / 10;
          newTotalTimersCs[parseInt(id)] = (Date.now() - totalInitialTimes[parseInt(id)]) / 10;
        }
      });
      setCurrentTimersCs(newCurrentTimersCs);
      setTotalTimersCs(newTotalTimersCs);
    }, 10);
  };

  return {
    handleLocalStart,
    handleLocalPause,
    handleLocalStop,
    currentTimersCs,
    setCurrentTimersCs,
    totalTimersCs,
    setTotalTimersCs,
    setInitialTimesMs,
    setTotalInitialTimesMs,
    isRunning,
    setIsRunning,
    isActive,
    setIsActive,
    intervalRef,
    createInterval,
  };
};
export default useLocalTimerArray;
