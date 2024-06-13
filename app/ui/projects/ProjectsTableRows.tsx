"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import { useLocalTimerArray, useDBSynchronizer } from "@/app/lib/hooks";

type Props = { columns: ProjectColumns[] };

const ProjectsTableRows: React.FC<Props> = ({ columns }) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  const projects = data?.data;
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
