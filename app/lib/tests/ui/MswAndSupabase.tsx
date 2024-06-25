"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectWithWorkingTimes } from "../../db/queries";
import { PostgrestError } from "@supabase/postgrest-js";

const getTestData = async (): Promise<{
  data: ProjectWithWorkingTimes[] | null;
  error?: PostgrestError | null | undefined;
}> => {
  return fetch("/projects").then((res) => res.json());
};

const MswAndSupabase: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getTestData,
    refetchOnWindowFocus: false,
  });

  const projects = data?.data || [];
  console.log(data);
  return (
    <div>
      <p>{isLoading ? "Loading..." : "Done"}</p>
    </div>
  );
};

export default MswAndSupabase;
