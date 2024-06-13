"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import { useLocalTimerArray, useDBSynchronizer } from "@/app/lib/hooks";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";

type Props = { columns: ProjectColumns[] };

const ProjectsTableRows: React.FC<Props> = ({ columns }) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
  });

  const projects = data?.data;
  const localTimerArray = useLocalTimerArray();

  useDBSynchronizer({ projects, localTimerArray });

  return (
    <ProjectsContextProvider>
      {isLoading ? (
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-64"></div>
          <div className="skeleton h-4 w-60"></div>
        </div>
      ) : (
        projects?.map((project, idx) => {
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
        })
      )}
    </ProjectsContextProvider>
  );
};

export default ProjectsTableRows;
