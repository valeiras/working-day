import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../projectFetchers";
import { ProjectWithWorkingTimes } from "../db/queries";

const useProjects: () => { projects: ProjectWithWorkingTimes[]; isLoading: boolean; isFetching: boolean } = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getAllProjects(),
    refetchOnWindowFocus: false,
  });

  const projects = data?.data || [];
  return { projects, isLoading, isFetching };
};

export default useProjects;
