import React from "react";

import { ProjectsList, ProjectsTable, ProjectsWrapper } from "@/app/ui";

const Projects: React.FC = () => {
  return (
    <ProjectsWrapper>
      <ProjectsTable className="hidden md:flex" />
      <ProjectsList className="flex md:hidden" />
    </ProjectsWrapper>
  );
};

export default Projects;
