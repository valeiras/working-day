import { selectAllProjects } from "@/app/lib/db/queries";

export async function GET(request: Request) {
  const { data, error } = await selectAllProjects();
  return Response.json({ data, error });
}
