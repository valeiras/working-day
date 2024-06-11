"use client";

import { useProjectsContext } from "@/app/contexts/ProjectsContext";
import React from "react";
import { FaPause, FaStop, FaPlay } from "react-icons/fa6";
type Props = { id: number };

const Controls: React.FC<Props> = ({ id }) => {
  const projectsContext = useProjectsContext();
  if (!projectsContext) {
    throw new Error("Projects context is not set");
  }

  const {
    contextObject: { isRunning },
  } = projectsContext;

  return (
    <div className="flex gap-1">
      <FaPlay className={`text-success ${isRunning[id] ? "opacity-20" : "cursor-pointer"}`} />
      <FaPause className={`text-warning ${isRunning[id] ? "cursor-pointer" : "opacity-20"}`} />
      <FaStop
        className={`text-accent ${isRunning[id] ? "cursor-pointer" : "opacity-20"}`}
        onClick={() => {
          console.log("pipo");
        }}
      />
    </div>
  );
};

export default Controls;
