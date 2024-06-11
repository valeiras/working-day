import React, { ReactNode } from "react";

import { Info, ProjectsList } from "@/app/ui";
import { ProjectColumns } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { getAllProjects } from "@/app/lib/actions";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

const columns: ProjectColumns[] = [
  "index",
  "name",
  "totalTime",
  "currentTime",
  "controls",
  "alerts",
  "overtimeThreshold",
  "edit",
];

const columnsLabels: Record<ProjectColumns, { content: ReactNode; className?: string }> = {
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

const Page: React.FC = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-stretch gap-4 bg-base-300 rounded-xl shadow-lg p-6 -mx-6">
        <h2 className="text-lg text-center">Projects:</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => {
                  return (
                    <th key={column} className={cn("text-center", columnsLabels[column].className)}>
                      {columnsLabels[column].content}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <ProjectsList columns={columns} />
            </tbody>
          </table>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
