import { useRef, useState } from "react";

const useLocalTimer = () => {
  const [localTimerCs, setLocalTimerCs] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleConnectedStart = (timerCs: number) => {
    const initialTimeMs = Date.now() - timerCs * 10;

    intervalRef.current = setInterval(() => {
      setLocalTimerCs((Date.now() - initialTimeMs) / 10);
    }, 10);
  };

  const handleLocalStart = () => {
    if (isRunning) return;
    setIsRunning(true);

    const initialTimeMs = Date.now() - localTimerCs * 10;

    intervalRef.current = setInterval(() => {
      setLocalTimerCs((Date.now() - initialTimeMs) / 10);
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
    setLocalTimerCs(0);
  };

  return {
    handleLocalStart,
    handleConnectedStart,
    handleLocalPause,
    handleLocalStop,
    localTimerCs,
    setLocalTimerCs,
    isRunning,
    setIsRunning,
    intervalRef,
  };
};

export default useLocalTimer;
