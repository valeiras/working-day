import React from "react";

import { ProjectsList, ProjectsTable } from "@/app/ui";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";

const Page: React.FC = async () => {
  return (
    <ProjectsContextProvider>
      <ProjectsTable className="hidden md:flex" />
      <ProjectsList className="flex md:hidden" />
    </ProjectsContextProvider>
  );
};

export default Page;
