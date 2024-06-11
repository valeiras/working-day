import { selectAllProjectsWithWorkingTimes } from "@/app/lib/db/queries";

import React from "react";

import { ProjectRow } from "@/app/ui";
import { ProjectColumns } from "@/app/lib/types";

const columns: ProjectColumns[] = [
  "index",
  "name",
  "totalTime",
  "controls",
  "isActive",
  "alerts",
  "overtimeThreshold",
  "edit",
];

const columnsLabels: Record<ProjectColumns, string> = {
  index: "#",
  name: "Name",
  totalTime: "Total time",
  isActive: "Is active",
  controls: "Controls",
  alerts: "Alerts",
  overtimeThreshold: "Overtime threshold",
  edit: "Edit",
};

const Page: React.FC = async () => {
  const { data: projects, error } = await selectAllProjectsWithWorkingTimes();
  if (error) console.log(error);

  return (
    <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
      <h2 className="text-lg text-center">Projects:</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => {
                return <th key={column}>{columnsLabels[column]}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {projects?.map((project, idx) => {
              return <ProjectRow key={project.id} project={project} columns={columns} idx={idx} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
