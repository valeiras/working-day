import { useRef, useState } from "react";

export type LocalTimerArray = {
  handleLocalStart: (projectId: number) => void;
  handleLocalPause: (projectId: number) => void;
  handleLocalStop: (projectId: number) => void;
  localTimersCs: Record<number, number>;
  setLocalTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  totalTimersCs: Record<number, number>;
  setTotalTimersCs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setTotalInitialTimesMs: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  isRunning: Record<number, boolean>;
  setIsRunning: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>;
  createInterval: (props: { currInitialTimes: Record<number, number>; currIsRunning: Record<number, boolean> }) => void;
};

const useLocalTimerArray = () => {
  const [localTimersCs, setLocalTimersCs] = useState<Record<number, number>>({});
  const [totalTimersCs, setTotalTimersCs] = useState<Record<number, number>>({});
  const [initialTimesMs, setInitialTimesMs] = useState<Record<number, number>>({});
  const [totalInitialTimesMs, setTotalInitialTimesMs] = useState<Record<number, number>>({});
  const [isRunning, setIsRunning] = useState<Record<number, boolean>>({});
  const [isActive, setIsActive] = useState<Record<number, boolean>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLocalStart = (projectId: number) => {
    if (isRunning[projectId]) return;
    const newIsRunning = { ...isRunning, [projectId]: true };
    setIsRunning(newIsRunning);
    setIsActive({ ...isActive, [projectId]: true });

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
    setIsActive({ ...isActive, [projectId]: false });

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
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const newLocalTimersCs = { ...localTimersCs };
      Object.entries(currInitialTimes).forEach(([id, time]) => {
        if (currIsRunning[parseInt(id)]) {
          newLocalTimersCs[parseInt(id)] = (Date.now() - time) / 10;
        }
      });
      setLocalTimersCs(newLocalTimersCs);
    }, 10);
  };

  return {
    handleLocalStart,
    handleLocalPause,
    handleLocalStop,
    localTimersCs,
    setLocalTimersCs,
    totalTimersCs,
    setTotalTimersCs,
    setInitialTimesMs,
    setTotalInitialTimesMs,
    isRunning,
    setIsRunning,
    intervalRef,
    createInterval,
  };
};
export default useLocalTimerArray;
