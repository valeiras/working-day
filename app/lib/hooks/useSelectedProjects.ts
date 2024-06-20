import { useEffect, useState } from "react";
import { ProjectWithWorkingTimes } from "../db/queries";

const useSelectedProjects = (projects: ProjectWithWorkingTimes[] | null | undefined) => {
  const [isSelected, setIsSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialIsSelected: Record<string, boolean> = {};
    projects?.forEach(({ id }) => (initialIsSelected[id] = true));
    setIsSelected(initialIsSelected);
  }, [projects]);

  const selectedProjects = projects?.filter(({ id }) => {
    return isSelected[id];
  });

  return { selectedProjects, isSelected, setIsSelected };
};

export default useSelectedProjects;
