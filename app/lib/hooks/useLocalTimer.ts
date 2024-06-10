import { useRef, useState } from "react";

const useLocalTimer = () => {
  const [localTimer, setLocalTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLocalStart = ({ timer }: { timer?: number } = {}) => {
    setIsRunning(true);

    console.log({ timer });
    const initialTime = Date.now() - (timer || localTimer) * 10;
    console.log({ initialTime });

    if (intervalRef.current) clearInterval(intervalRef.current);
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
