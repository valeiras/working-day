"use server";

import React from "react";
import { ProjectsTableHeader, ProjectsTableRows } from "@/app/ui";
import { ProjectColumns } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

const columns: ProjectColumns[] = ["index", "name", "totalTime", "currentTime", "controls", "edit"];

type Props = { className?: string };
const ProjectsTable: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6", className)}>
      <h2 className="text-lg text-center font-medium">Projects:</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <ProjectsTableHeader columns={columns} />
          <tbody>
            <ProjectsTableRows columns={columns} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
