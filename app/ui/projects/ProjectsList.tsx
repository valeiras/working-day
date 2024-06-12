"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";
import { ProjectsContextSetter } from "..";

type Props = { columns: ProjectColumns[] };

const ProjectsList: React.FC<Props> = ({ columns }) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    staleTime: 10 * 1000,
  });

  const projects = data?.data || [];

  return (
    <ProjectsContextProvider>
      <ProjectsContextSetter />
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-64"></div>
          <div className="skeleton h-4 w-60"></div>
        </div>
      ) : (
        projects?.map((project, idx) => {
          return <ProjectRow key={project.id} project={project} columns={columns} idx={idx} isFetching={isFetching} />;
        })
      )}
    </ProjectsContextProvider>
  );
};

export default ProjectsList;
