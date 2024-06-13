"use client";

import { getAllProjects } from "@/app/lib/actions";
import { cn } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type Props = { className: string };
const ProjectsList: React.FC<Props> = ({ className }) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    staleTime: 10 * 1000,
    refetchOnWindowFocus: false,
  });

  const projects = data?.data;
  return (
    <div className={cn("flex flex-col items-stretch gap-1 bg-accent px-4 w-full mx-2", className)}>ProjectsList</div>
  );
};

export default ProjectsList;
