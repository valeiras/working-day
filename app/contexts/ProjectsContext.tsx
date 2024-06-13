"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";

type ProjectsContextType = {
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  lastSubmittedProjectId: number | null;
  setLastSubmittedProjectId: Dispatch<SetStateAction<number | null>>;
} | null;

const ProjectsContext = createContext<ProjectsContextType>(null);

export const useProjectsContext = () => {
  return useContext<ProjectsContextType>(ProjectsContext);
};

export const ProjectsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedProjectId, setLastSubmittedProjectId] = useState<number | null>(null);

  return (
    <ProjectsContext.Provider
      value={{
        isSubmitting,
        setIsSubmitting,
        lastSubmittedProjectId,
        setLastSubmittedProjectId,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
