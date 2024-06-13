import React, { ReactNode } from "react";
import { FaCheck, FaList } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import { ProjectColumns } from "@/app/lib/types";
import { TotalTime, CurrentTime, Controls, EditButtons } from "@/app/ui";
import { cn } from "@/app/lib/utils";
import { LocalTimerArray } from "@/app/lib/hooks/useLocalTimerArray";

type Props = {
  project: ProjectWithWorkingTimes;
  idx: number;
  columns: ProjectColumns[];
  isFetching?: boolean;
  localTimerArray: LocalTimerArray;
};

const ProjectRow: React.FC<Props> = ({ project, idx, columns, isFetching, localTimerArray }) => {
  const { id, name } = project;
  const isActive = localTimerArray.isActive[project.id];

  const projectCells: Record<ProjectColumns, { content: ReactNode; className?: string }> = {
    index: { content: idx, className: "text-left" },
    name: { content: name, className: "text-left" },
    totalTime: {
      content: <TotalTime id={project.id} totalTimersCs={localTimerArray.totalTimersCs} isFetching={isFetching} />,
    },
    currentTime: {
      content: (
        <CurrentTime id={project.id} currentTimersCs={localTimerArray.currentTimersCs} isFetching={isFetching} />
      ),
    },
    isActive: { content: isActive ? <FaCheck /> : <IoClose /> },
    controls: {
      content: <Controls id={project.id} project={project} isFetching={isFetching} localTimerArray={localTimerArray} />,
    },
    alerts: { content: <div>Mail(8h)</div> },
    overtimeThreshold: { content: <div>8h/day</div> },
    edit: {
      content: <EditButtons />,
      className: "text-right",
    },
  };

  return (
    <tr key={id} className={isActive ? "bg-neutral" : ""}>
      {columns.map((column) => {
        return (
          <td key={column} className={cn("text-center px-8", projectCells[column].className)}>
            {projectCells[column].content}
          </td>
        );
      })}
    </tr>
  );
};

export default ProjectRow;
