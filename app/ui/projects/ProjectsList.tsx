"use client";

import { getAllProjects } from "@/app/lib/projectFetchers";
import { useDBSynchronizer, useLocalTimerArray } from "@/app/lib/hooks";
import { cn } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProjectCard from "./ProjectCard";

type Props = { className: string };
const ProjectsList: React.FC<Props> = ({ className }) => {
  const { data, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  const projects = data?.data;
  const localTimerArray = useLocalTimerArray();
  useDBSynchronizer({ projects, localTimerArray });

  return (
    <div className={cn("flex flex-col items-stretch gap-4 px-2 w-full", className)}>
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} localTimerArray={localTimerArray} isFetching={isFetching} />
      ))}
    </div>
  );
};

export default ProjectsList;
