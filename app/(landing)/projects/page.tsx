import React from "react";

import { ProjectsList, ProjectsTable, ProjectsWrapper, SaveBlockModal } from "@/app/ui";
import EditProjectModal from "@/app/ui/modals/EditProjectModal";
import DeleteProjectModal from "@/app/ui/modals/DeleteProjectModal";

const Projects: React.FC = () => {
  return (
    <ProjectsWrapper>
      <ProjectsTable className="hidden md:flex" />
      <ProjectsList className="flex md:hidden" />
      <SaveBlockModal />
      <EditProjectModal />
      <DeleteProjectModal />
    </ProjectsWrapper>
  );
};

export default Projects;
