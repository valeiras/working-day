import { useRef, useState } from "react";

const useLocalTimer = () => {
  const [localTimer, setLocalTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleConnectedStart = (timer: number) => {
    const initialTime = Date.now() - timer * 10;

    intervalRef.current = setInterval(() => {
      setLocalTimer((Date.now() - initialTime) / 10);
    }, 10);
  };

  const handleLocalStart = () => {
    if (isRunning) return;
    setIsRunning(true);

    const initialTime = Date.now() - localTimer * 10;

    intervalRef.current = setInterval(() => {
      setLocalTimer((Date.now() - initialTime) / 10);
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
    handleConnectedStart,
    handleLocalPause,
    handleLocalStop,
    localTimer,
    setLocalTimer,
    isRunning,
    setIsRunning,
    intervalRef,
  };
};

export default useLocalTimer;
