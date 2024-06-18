import { ProjectColumns } from "@/app/lib/types";
import React, { ReactNode } from "react";
import Info from "../Info";
import { cn } from "@/app/lib/utils";

type Props = { columns: ProjectColumns[] };

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

const ProjectsTableHeader: React.FC<Props> = ({ columns }) => {
  return (
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
  );
};

export default ProjectsTableHeader;
