import React from "react";

import { ProjectsList, ProjectsTable } from "@/app/ui";
import { ProjectsContextProvider } from "@/app/contexts/ProjectsContext";

const Projects: React.FC = () => {
  return (
    <ProjectsContextProvider>
      <ProjectsTable className="hidden md:flex" />
      <ProjectsList className="flex md:hidden" />
    </ProjectsContextProvider>
  );
};

export default Projects;
