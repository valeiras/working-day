"use client";

import React, { PropsWithChildren } from "react";

import { LoadingSkeleton } from "@/app/ui";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/app/lib/actions";

const ProjectsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  return isLoading ? <LoadingSkeleton /> : <ProjectsContextProvider>{children}</ProjectsContextProvider>;
};

export default ProjectsWrapper;
