import { insertProject, selectAllProjects } from "@/app/lib/db/queries";

export async function GET(request: Request) {
  const { data, error } = await selectAllProjects();
  return Response.json({ data, error });
}
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name) return Response.json({ data: null, error: new Error("Missing name") });

  const { data, error } = await insertProject({ name: body.name });
  return Response.json({ data, error });
}
