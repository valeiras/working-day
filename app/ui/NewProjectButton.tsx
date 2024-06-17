"use client";

import React from "react";

type Props = { showModal: () => void };
const NewProjectButton: React.FC<Props> = ({ showModal }) => {
  return (
    <>
      <button className="btn btn-primary" onClick={showModal}>
        Create new project
      </button>
    </>
  );
};

export default NewProjectButton;
