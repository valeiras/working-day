"use client";

import React, { PropsWithChildren } from "react";

import { LoadingSkeleton } from "@/app/ui";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";
import { SaveBlockContextProvider } from "@/app/contexts/SaveBlockContext";
import { EditProjectContextProvider } from "@/app/contexts/EditProjectContext";
import { useProjects } from "@/app/lib/hooks";

const ProjectsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useProjects();

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <ProjectsContextProvider>
      <EditProjectContextProvider>
        <SaveBlockContextProvider>{children}</SaveBlockContextProvider>
      </EditProjectContextProvider>
    </ProjectsContextProvider>
  );
};

export default ProjectsWrapper;
