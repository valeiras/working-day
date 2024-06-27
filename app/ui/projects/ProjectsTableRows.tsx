"use client";

import React from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import { useLocalTimerArray, useDBSynchronizer, useProjects } from "@/app/lib/hooks";

type Props = { columns: ProjectColumns[] };

const ProjectsTableRows: React.FC<Props> = ({ columns }) => {
  const { projects, isFetching } = useProjects();

  const localTimerArray = useLocalTimerArray();
  useDBSynchronizer({ projects, localTimerArray });

  return projects?.map((project, idx) => {
    return (
      <ProjectRow
        key={project.id}
        project={project}
        columns={columns}
        idx={idx}
        isFetching={isFetching}
        localTimerArray={localTimerArray}
      />
    );
  });
};

export default ProjectsTableRows;
