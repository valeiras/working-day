"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";

type Props = { columns: ProjectColumns[] };

const ProjectsList: React.FC<Props> = ({ columns }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    staleTime: 10 * 1000,
  });

  const projects = data?.data || [];

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-24"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      ) : (
        projects?.map((project, idx) => {
          return <ProjectRow key={project.id} project={project} columns={columns} idx={idx} />;
        })
      )}
    </>
  );
};

export default ProjectsList;
