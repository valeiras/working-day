import React, { ReactNode } from "react";
import { FaCheck, FaList } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import Link from "next/link";
import { ProjectColumns } from "@/app/lib/types";
import { TotalTime, CurrentTime, Controls } from "@/app/ui";
import { cn } from "@/app/lib/utils";

type Props = { project: ProjectWithWorkingTimes; idx: number; columns: ProjectColumns[] };

const ProjectRow: React.FC<Props> = ({ project, idx, columns }) => {
  const { activeBlock, id, name } = project;

  const projectCells: Record<ProjectColumns, { content: ReactNode; className?: string }> = {
    index: { content: idx, className: "text-left" },
    name: { content: name, className: "text-left" },
    totalTime: { content: <TotalTime id={project.id} /> },
    currentTime: { content: <CurrentTime id={project.id} /> },
    isActive: { content: activeBlock?.id ? <FaCheck /> : <IoClose /> },
    controls: { content: <Controls id={project.id} /> },
    alerts: { content: <div>Mail(8h)</div> },
    overtimeThreshold: { content: <div>8h/day</div> },
    edit: {
      content: (
        <div className="flex gap-2">
          <Link href="/">
            <MdEdit />
          </Link>
          <Link href="/">
            <FaList />
          </Link>
        </div>
      ),
      className: "text-right",
    },
  };

  return (
    <tr key={id} className={activeBlock?.id ? "bg-neutral" : ""}>
      {columns.map((column) => {
        return (
          <td key={column} className={cn("text-center", projectCells[column].className)}>
            {projectCells[column].content}
          </td>
        );
      })}
    </tr>
  );
};

export default ProjectRow;
