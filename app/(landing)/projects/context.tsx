"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";

type ProjectsContextType = {
  currentTimersCs: Record<number, number>;
  setCurrentTimersCs: Dispatch<SetStateAction<Record<number, number>>>;
  totalTimersCs: Record<number, number>;
  setTotalTimersCs: Dispatch<SetStateAction<Record<number, number>>>;
  isRunning: Record<number, boolean>;
  setIsRunning: Dispatch<SetStateAction<Record<number, boolean>>>;
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
} | null;

const ProjectsContext = createContext<ProjectsContextType>(null);

export const useProjectsContext = () => {
  return useContext<ProjectsContextType>(ProjectsContext);
};

export const ProjectsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentTimersCs, setCurrentTimersCs] = useState<Record<number, number>>({});
  const [totalTimersCs, setTotalTimersCs] = useState<Record<number, number>>({});
  const [isRunning, setIsRunning] = useState<Record<number, boolean>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <ProjectsContext.Provider
      value={{
        currentTimersCs,
        setCurrentTimersCs,
        totalTimersCs,
        setTotalTimersCs,
        isRunning,
        setIsRunning,
        intervalRef,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
