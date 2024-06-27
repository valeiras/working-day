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

export const editProject = async ({ id, name }: { id: number; name: string }) => {
  return fetch(url, { method: "put", body: JSON.stringify({ id, name }) }).then((res) => res.json());
};

export const deleteProject = async ({ id }: { id: number }) => {
  return fetch(url, { method: "delete", body: JSON.stringify({ id }) }).then((res) => res.json());
};
