"use client";

import React, { useRef } from "react";
import ConnectedStopwatch from "./watch/ConnectedStopwatch";
import ProjectSelector from "./ProjectSelector";
import NewProjectButton from "./NewProjectButton";
import NewProjectModal from "./modals/NewProjectModal";
import { SaveBlockContextProvider } from "../contexts/SaveBlockContext";

const ConnectedStopwatchAndProjectSelector: React.FC = () => {
  const [projectId, setProjectId] = React.useState<number | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => modalRef.current?.close();
  const openModal = () => modalRef.current?.showModal();

  return (
    <SaveBlockContextProvider>
      <ConnectedStopwatch projectId={projectId} />
      <ProjectSelector setProjectId={setProjectId} />
      <NewProjectModal ref={modalRef} closeModal={closeModal} />

      <NewProjectButton showModal={openModal} />
    </SaveBlockContextProvider>
  );
};

export default ConnectedStopwatchAndProjectSelector;
