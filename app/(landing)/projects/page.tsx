import React from "react";

import { getAllProjects } from "@/app/lib/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { ProjectsList, ProjectsTable } from "@/app/ui";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";

const Page: React.FC = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsContextProvider>
        <ProjectsTable className="hidden md:flex" />
        <ProjectsList className="flex md:hidden" />
      </ProjectsContextProvider>
    </HydrationBoundary>
  );
};

export default Page;
