"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../lib/projectFetchers";

type Props = { setProjectId: React.Dispatch<React.SetStateAction<number | null>> };

const ProjectSelector: React.FC<Props> = ({ setProjectId }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    refetchOnWindowFocus: false,
  });

  const projects = data?.data || [];

  return (
    <div className="flex flex-col gap-4">
      <select
        className="select select-primary w-full max-w-xs"
        disabled={projects.length === 0}
        defaultValue="default"
        data-testid="select-project"
        onChange={(e) => {
          setProjectId(Number(e.target.value));
        }}
      >
        <option disabled value="default" data-testid="select-project-option">
          {isLoading
            ? "Loading projects..."
            : projects.length > 0
            ? "Select your project"
            : "There are no projects available."}
        </option>
        {projects.map(({ id, name }) => (
          <option key={id} value={id} data-testid="select-project-option">
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
