"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithWorkingTimes } from "../../db/queries";
import { PostgrestError } from "@supabase/postgrest-js";

const getTestData = async (): Promise<{
  data: ProjectWithWorkingTimes[] | null;
  error?: PostgrestError | null | undefined;
}> => {
  return fetch("/api/v1/projects").then((res) => res.json());
};

const MswWithSupabase: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getTestData,
    refetchOnWindowFocus: false,
  });

  const projects = data?.data || [];
  return (
    <div>
      <p>{isLoading ? "Loading..." : "Done"}</p>
      {projects.map((project) => {
        return (
          <p key={project.id} data-testid="project-p">
            {project.name}
          </p>
        );
      })}
    </div>
  );
};

export default MswWithSupabase;
