"use client";

import React, { useRef } from "react";
import NewProjectModal from "./NewProjectModal";

const NewProjectButton: React.FC = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const closeModal = () => modalRef.current?.close();
  return (
    <>
      <button className="btn btn-primary" onClick={() => modalRef.current?.showModal()}>
        Create new project
      </button>
      <NewProjectModal ref={modalRef} closeModal={closeModal} />
    </>
  );
};

export default NewProjectButton;
