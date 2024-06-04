import { selectProjectById } from "@/app/lib/db/queries";

export async function GET(request: Request, { params: { projectId } }: { params: { projectId: number } }) {
  const { data, error } = await selectProjectById(Number(projectId));
  return Response.json({ data, error });
}
