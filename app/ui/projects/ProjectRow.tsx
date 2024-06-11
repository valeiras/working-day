import React, { ReactNode } from "react";
import { FaCheck, FaList } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import Link from "next/link";
import { ProjectColumns } from "@/app/lib/types";
import TotalTime from "./TotalTime";
import CurrentTime from "./CurrentTime";

type Props = { project: ProjectWithWorkingTimes; idx: number; columns: ProjectColumns[] };

const ProjectRow: React.FC<Props> = ({ project, idx, columns }) => {
  const { activeBlock, id, name } = project;

  const projectCells: Record<ProjectColumns, { content: ReactNode; className?: string }> = {
    index: { content: idx },
    name: { content: name },
    totalTime: { content: <TotalTime id={project.id} /> },
    currentTime: { content: <CurrentTime id={project.id} /> },
    isActive: { content: activeBlock?.id ? <FaCheck /> : <IoClose />, className: "flex justify-center" },
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
    },
    controls: { content: <div></div> },
    alerts: { content: <div></div> },
    overtimeThreshold: { content: <div></div> },
  };

  return (
    <tr key={id} className={activeBlock?.id ? "bg-neutral" : ""}>
      {columns.map((column) => {
        return (
          <td key={column} className={projectCells[column].className}>
            {projectCells[column].content}
          </td>
        );
      })}
    </tr>
  );
};

export default ProjectRow;
