"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useDBSynchronizer, useLocalTimerArray } from "@/app/lib/hooks";
import { cn } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProjectCard from "./ProjectCard";

type Props = { className: string };
const ProjectsList: React.FC<Props> = ({ className }) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  const projects = data?.data;
  const localTimerArray = useLocalTimerArray();
  useDBSynchronizer({ projects, localTimerArray });

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-4 w-3/4">
          <div className="skeleton h-4 w-64"></div>
          <div className="skeleton h-4 w-60"></div>
        </div>
      ) : (
        <div className={cn("flex flex-col items-stretch gap-4 px-2 w-full", className)}>
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} localTimerArray={localTimerArray} isFetching={isFetching} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProjectsList;
