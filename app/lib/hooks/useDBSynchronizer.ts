import { useEffect } from "react";
import { ProjectWithWorkingTimes } from "../db/queries";
import { LocalTimerArray } from "./useLocalTimerArray";
import { getAllTimers } from "../getTimers";

const useDBSynchronizer = ({
  localTimerArray,
  projects,
}: {
  localTimerArray: LocalTimerArray;
  projects: ProjectWithWorkingTimes[] | null | undefined;
}) => {
  const {
    setCurrentTimersCs,
    setTotalTimersCs,
    setCurrentInitialTimesMs,
    setTotalInitialTimesMs,
    setIsRunning,
    setIsActive,
    intervalRef,
    createInterval,
  } = localTimerArray;

  useEffect(() => {
    if (!projects) return;
    const { currentTimersCs, totalTimersCs, currentInitialMs, totalInitialMs, isRunning, isActive } = getAllTimers({
      projects,
    });
    if (intervalRef.current) clearInterval(intervalRef.current);

    setCurrentTimersCs(currentTimersCs);
    setTotalTimersCs(totalTimersCs);
    setCurrentInitialTimesMs(currentInitialMs);
    setTotalInitialTimesMs(totalInitialMs);
    setIsRunning(isRunning);
    setIsActive(isActive);

    intervalRef.current = setInterval(() => {
      createInterval({
        currentInitialTimes: currentInitialMs,
        isRunning: isRunning,
        totalInitialTimes: totalInitialMs,
        totalTimers: totalTimersCs,
        currentTimers: currentTimersCs,
      });
    }, 10);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);
};

export default useDBSynchronizer;
