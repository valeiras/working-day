import React, { ReactNode } from "react";
import { Info, ProjectsTableRows } from "@/app/ui";
import { ProjectColumns } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";

const columns: ProjectColumns[] = ["index", "name", "totalTime", "currentTime", "controls", "edit"];

const columnLabels: Record<ProjectColumns, { content: ReactNode; className?: string }> = {
  index: { content: "#", className: "text-left" },
  name: { content: "Name", className: "text-left" },
  totalTime: {
    content: (
      <>
        Total time{" "}
        <Info
          text="Total accumulated time spent on this project"
          className="tooltip-bottom tooltip-primary tooltip-sm"
        />
      </>
    ),
  },
  currentTime: {
    content: (
      <>
        Current time <Info text="Current working day time" className="tooltip-bottom tooltip-primary tooltip-sm" />
      </>
    ),
  },
  isActive: { content: "Is active" },
  controls: { content: "Controls" },
  alerts: { content: "Alerts" },
  overtimeThreshold: { content: "Overtime threshold" },
  edit: { content: "Edit", className: "text-right" },
};

type Props = { className?: string };
const ProjectsTable: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6", className)}>
      <h2 className="text-lg text-center font-medium">Projects:</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th key={column} className={cn("text-center px-8", columnLabels[column].className)}>
                    {columnLabels[column].content}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <ProjectsTableRows columns={columns} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
