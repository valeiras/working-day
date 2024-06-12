"use client";

import { getAllProjects } from "@/app/lib/actions";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import ProjectRow from "./ProjectRow";
import { ProjectColumns } from "@/app/lib/types";
import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import setProjectContext from "@/app/lib/setProjectContext";

type Props = { columns: ProjectColumns[] };

const ProjectsList: React.FC<Props> = ({ columns }) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    staleTime: 10 * 1000,
  });

  const projects = data?.data;
  const projectsContext = useProjectsContext();
  if (!projectsContext) {
    throw new Error("Projects context is not set");
  }
  const {
    setContextObject,
    contextObject: { intervalRef },
  } = projectsContext;

  useEffect(() => {
    if (!projects) return;

    setProjectContext({
      projects,
      intervalRef,
      setContextObject,
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  return (
    <>
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
    </>
  );
};

export default ProjectsList;
