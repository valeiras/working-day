import { useRef, useState } from "react";

export type LocalTimerArray = {
  handleLocalStart: (projectId: number) => void;
  handleLocalPause: (projectId: number) => void;
  handleLocalStop: (projectId: number) => void;
  currentTimersCs: Record<number, number>;
  setCurrentTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  totalTimersCs: Record<number, number>;
  setTotalTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setCurrentInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setTotalInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  isRunning: Record<number, boolean>;
  setIsRunning: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  isActive: Record<number, boolean>;
  setIsActive: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  createInterval: (params: {
    currentInitialTimes: Record<number, number>;
    totalInitialTimes: Record<number, number>;
    currentTimers: Record<number, number>;
    totalTimers: Record<number, number>;
    isRunning: Record<number, boolean>;
  }) => void;
};

const useLocalTimerArray: () => LocalTimerArray = () => {
  const [currentTimersCs, setCurrentTimersCs] = useState<Record<number, number>>({});
  const [totalTimersCs, setTotalTimersCs] = useState<Record<number, number>>({});
  const [currentInitialTimesMs, setCurrentInitialTimesMs] = useState<Record<number, number>>({});
  const [totalInitialTimesMs, setTotalInitialTimesMs] = useState<Record<number, number>>({});
  const [isRunning, setIsRunning] = useState<Record<number, boolean>>({});
  const [isActive, setIsActive] = useState<Record<number, boolean>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLocalStart = (projectId: number) => {
    const newIsRunning = { ...isRunning, [projectId]: true };
    setIsRunning(newIsRunning);
    setIsActive({ ...isActive, [projectId]: true });

    const currTimer = currentTimersCs[projectId] || 0;
    const newInitialTimesMs = { ...currentInitialTimesMs, [projectId]: Date.now() - currTimer * 10 };
    setCurrentInitialTimesMs(newInitialTimesMs);
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

  const createInterval = (params: {
    currentInitialTimes?: Record<number, number>;
    totalInitialTimes?: Record<number, number>;
    totalTimers?: Record<number, number>;
    currentTimers?: Record<number, number>;
    isRunning?: Record<number, boolean>;
  }) => {
    const currInitTimes = params.currentInitialTimes || currentInitialTimesMs;
    const totInitTimes = params.totalInitialTimes || totalInitialTimesMs;
    const currTimers = params.currentTimers || currentTimersCs;
    const totTimers = params.totalTimers || totalTimersCs;
    const isRun = params.isRunning || isRunning;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const newCurrentTimersCs = { ...currTimers };
      const newTotalTimersCs = { ...totTimers };

      Object.entries(currInitTimes).forEach(([id, time]) => {
        if (isRun[parseInt(id)]) {
          newCurrentTimersCs[parseInt(id)] = (Date.now() - time) / 10;
          newTotalTimersCs[parseInt(id)] = (Date.now() - totInitTimes[parseInt(id)]) / 10;
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
    setCurrentInitialTimesMs,
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
