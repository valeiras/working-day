"use client";

import { createContext, useState, useContext, useRef, Dispatch, SetStateAction, MutableRefObject } from "react";

type ProjectsContextType = {
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
} | null;

const ProjectsContext = createContext<ProjectsContextType>(null);

export const useProjectsContext = () => {
  return useContext<ProjectsContextType>(ProjectsContext);
};

export const ProjectsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <ProjectsContext.Provider
      value={{
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
