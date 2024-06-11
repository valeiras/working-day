"use client";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import React from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import { useProjectsContext } from "@/app/(landing)/projects/context";

type Props = { projects: ProjectWithWorkingTimes[] | null; columns: ProjectColumns[] };

const ProjectRows: React.FC<Props> = ({ projects, columns }) => {
  const projectsContext = useProjectsContext();
  if (!projectsContext) {
    throw new Error("Projects context is not set");
  }
  const { totalTimersCs, currentTimersCs } = projectsContext;

  return (
    <>
      {projects?.map((project, idx) => {
        return (
          <ProjectRow
            key={project.id}
            project={project}
            columns={columns}
            idx={idx}
            totalTimersCs={totalTimersCs}
            currentTimersCs={currentTimersCs}
          />
        );
      })}
    </>
  );
};

export default ProjectRows;
