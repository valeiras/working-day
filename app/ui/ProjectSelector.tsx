"use client";

import React from "react";
import { Tables } from "../lib/db/database.types";
import useSWR from "swr";
import { fetcher } from "../lib/utils";

type Props = { setProjectId: React.Dispatch<React.SetStateAction<number | null>> };

const ProjectSelector: React.FC<Props> = ({ setProjectId }) => {
  const { data, isLoading } = useSWR("/api/v1/projects", fetcher);
  const projects = (data?.data as Tables<"projects">[]) || [];

  return (
    <div className="flex flex-col gap-4">
      <select
        className="select select-primary w-full max-w-xs"
        disabled={projects.length === 0}
        defaultValue="default"
        onChange={(e) => {
          setProjectId(Number(e.target.value));
        }}
      >
        <option disabled value="default">
          {isLoading
            ? "Loading projects..."
            : projects.length > 0
            ? "Select your project"
            : "There are no projects available."}
        </option>
        {projects.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProjectSelector;
