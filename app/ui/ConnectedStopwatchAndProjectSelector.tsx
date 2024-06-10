"use client";

import React from "react";
import ConnectedStopwatch from "./watch/ConnectedStopwatch";
import ProjectSelector from "./ProjectSelector";
import Link from "next/link";

const ConnectedStopwatchAndProjectSelector: React.FC = () => {
  const [projectId, setProjectId] = React.useState<number | null>(null);
  return (
    <>
      <ConnectedStopwatch projectId={projectId} />
      <ProjectSelector setProjectId={setProjectId} />
      <Link className="btn btn-primary" href={"/new-project"}>
        Create new project
      </Link>
    </>
  );
};

export default ConnectedStopwatchAndProjectSelector;
