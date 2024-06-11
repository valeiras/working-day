"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";
import { ProjectWithWorkingTimes } from "../lib/db/queries";

type ContextObject = {
  projects: ProjectWithWorkingTimes[] | null;
  currentTimersCs: Record<number, number>;
  totalTimersCs: Record<number, number>;
  isRunning: Record<number, boolean>;
  intervalRef: MutableRefObject<NodeJS.Timeout | null>;
};

type ProjectsContextType = {
  contextObject: ContextObject;
  setContextObject: Dispatch<SetStateAction<ContextObject>>;
} | null;

const ProjectsContext = createContext<ProjectsContextType>(null);

export const useProjectsContext = () => {
  return useContext<ProjectsContextType>(ProjectsContext);
};

export const ProjectsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [contextObject, setContextObject] = useState<ContextObject>({
    projects: [],
    currentTimersCs: {},
    totalTimersCs: {},
    isRunning: {},
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