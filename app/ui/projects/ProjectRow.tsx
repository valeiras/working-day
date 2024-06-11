import React, { ReactNode } from "react";
import { FaCheck, FaList } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import { computeAcumulatedTimer, formatTime } from "@/app/lib/utils";
import Link from "next/link";
import { ProjectColumns } from "@/app/lib/types";

type Props = { project: ProjectWithWorkingTimes; idx: number; columns: ProjectColumns[] };

const ProjectRow: React.FC<Props> = ({ project, idx, columns }) => {
  const { workingBlocks, activeBlock, id, name } = project;
  const totalTimer = workingBlocks.reduce((acc, { startTimes }) => {
    return acc + computeAcumulatedTimer(startTimes);
  }, 0);
  const { hours, minutes, seconds } = formatTime(totalTimer);

  const projectCells: Record<ProjectColumns, { content: ReactNode; className?: string }> = {
    index: { content: idx },
    name: { content: name },
    totalTime: { content: `${hours}:${minutes}:${seconds}` },
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
    controls: { content: <div>Controls</div> },
    alerts: { content: <div>Alerts</div> },
    overtimeThreshold: { content: <div>Overtime threshold</div> },
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
