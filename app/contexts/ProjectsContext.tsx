"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";

type ProjectsContextType = {
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  lastSubmittedProjectId: number | null;
  setLastSubmittedProjectId: Dispatch<SetStateAction<number | null>>;
  modalTimerCs: number;
  setModalTimerCs: Dispatch<SetStateAction<number>>;
  saveBlockModalBlockId: number | null;
  setSaveBlockModalBlockId: Dispatch<SetStateAction<number | null>>;
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
  const [saveBlockModalBlockId, setSaveBlockModalBlockId] = useState<number | null>(null);
  const [modalTimerCs, setModalTimerCs] = useState<number>(0);

  return (
    <ProjectsContext.Provider
      value={{
        isSubmitting,
        setIsSubmitting,
        lastSubmittedProjectId,
        setLastSubmittedProjectId,
        modalTimerCs,
        setModalTimerCs,
        saveBlockModalBlockId,
        setSaveBlockModalBlockId,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
