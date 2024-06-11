"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";

type ProjectsContextType = {
  currentTimersCs: Record<number, number>;
  setCurrentTimersCs: Dispatch<SetStateAction<Record<number, number>>>;
  totalTimersCs: Record<number, number>;
  setTotalTimersCs: Dispatch<SetStateAction<Record<number, number>>>;
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <ProjectsContext.Provider
      value={{
        currentTimersCs,
        setCurrentTimersCs,
        totalTimersCs,
        setTotalTimersCs,
        intervalRef,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
