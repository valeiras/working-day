import { useRef, useState } from "react";

const useLocalTimer = () => {
  const [localTimer, setLocalTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const setLocalStartTime = () => {
    startTimeRef.current = Date.now() - localTimer * 10;
  };

  const handleLocalStart = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setLocalTimer((Date.now() - startTimeRef.current) / 10);
    }, 10);
  };

  const handleLocalPause = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleLocalStop = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setLocalTimer(0);
  };

  return {
    handleLocalStart,
    handleLocalPause,
    handleLocalStop,
    setLocalStartTime,
    localTimer,
    setLocalTimer,
    isRunning,
    setIsRunning,
    startTimeRef,
  };
};

export default useLocalTimer;
