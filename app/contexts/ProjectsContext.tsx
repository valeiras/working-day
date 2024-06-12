"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";

export type ProjectsContextObject = {
  currentTimersCs: Record<number, number>;
  totalTimersCs: Record<number, number>;
  isRunning: Record<number, boolean>;
  isActive: Record<number, boolean>;
  isFetching: boolean;
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
};

type ProjectsContextType = {
  contextObject: ProjectsContextObject;
  setContextObject: Dispatch<SetStateAction<ProjectsContextObject>>;
} | null;

const ProjectsContext = createContext<ProjectsContextType>(null);

export const useProjectsContext = () => {
  return useContext<ProjectsContextType>(ProjectsContext);
};

export const ProjectsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [contextObject, setContextObject] = useState<ProjectsContextObject>({
    currentTimersCs: {},
    totalTimersCs: {},
    isRunning: {},
    isActive: {},
    isFetching: false,
    intervalRef: useRef<NodeJS.Timeout | null>(null),
  });

  return (
    <ProjectsContext.Provider
      value={{
        contextObject,
        setContextObject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
