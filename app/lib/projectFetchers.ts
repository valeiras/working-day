import { ProjectWithWorkingTimes } from "./db/queries";
import { PostgrestError } from "@supabase/postgrest-js";

const url = "/api/v1/projects";

export const getAllProjects = async (): Promise<{
  data: ProjectWithWorkingTimes[] | null;
  error?: PostgrestError | null;
}> => {
  return fetch(url).then((res) => res.json());
};

export const createNewProject = async ({ name }: { name: string }) => {
  return fetch(url, { method: "post", body: JSON.stringify({ name }) }).then((res) => res.json());
};
