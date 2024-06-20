import { ProjectWithWorkingTimes } from "@/app/lib/db/queries";
import React from "react";

type Props = {
  setIsSelected: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  projects: ProjectWithWorkingTimes[] | null | undefined;
};

const StatsProjectSelector: React.FC<Props> = ({ setIsSelected, projects }) => {
  return (
    <div className="dropdown">
      <div role="button" tabIndex={0} className="m-1 btn btn-primary">
        Select Projects
      </div>
      <div
        tabIndex={0}
        className="p-2 flex flex-col w-fit dropdown-content bg-base-200 z-[1] rounded-box max-h-44 overflow-y-auto"
      >
        {projects?.map(({ id, name }) => {
          return (
            <label key={id} className="cursor-pointer label">
              <span className="label-text mr-2">{name}</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked={true}
                name={String(id)}
                onChange={(e) => {
                  setIsSelected((prev) => {
                    return { ...prev, [e.target.name]: e.target.checked };
                  });
                }}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StatsProjectSelector;
