"use client";

import React, { PropsWithChildren } from "react";

import { LoadingSkeleton } from "@/app/ui";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/app/lib/projectFetchers";
import { SaveBlockModalContextProvider } from "@/app/contexts/SaveBlockModalContext";

const ProjectsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <ProjectsContextProvider>
      <SaveBlockModalContextProvider>{children}</SaveBlockModalContextProvider>
    </ProjectsContextProvider>
  );
};

export default ProjectsWrapper;
