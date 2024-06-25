import { ProjectWithWorkingTimes } from "./db/queries";
import { PostgrestError } from "@supabase/postgrest-js";

export const fetchAllProjects = async (): Promise<{
  data: ProjectWithWorkingTimes[] | null;
  error?: PostgrestError | null;
}> => {
  return fetch("/api/v1/projects").then((res) => res.json());
};
