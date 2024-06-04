"use client";

import React from "react";
import ConnectedStopwatch from "./watch/ConnectedStopwatch";
import ProjectSelector from "./ProjectSelector";
import NewProjectButton from "./NewProjectButton";

const ConnectedStopwatchAndProjectSelector: React.FC = () => {
  const [projectId, setProjectId] = React.useState<number | null>(null);
  return (
    <>
      <ConnectedStopwatch projectId={projectId} />
      <ProjectSelector setProjectId={setProjectId} />
      <NewProjectButton />
    </>
  );
};

export default ConnectedStopwatchAndProjectSelector;
