"use client";

import { useDBSynchronizer, useLocalTimerArray, useProjects } from "@/app/lib/hooks";
import { cn } from "@/app/lib/utils";
import React from "react";
import ProjectCard from "./ProjectCard";

type Props = { className: string };
const ProjectsList: React.FC<Props> = ({ className }) => {
  const { projects, isFetching } = useProjects();
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
