import { createProject, selectAllProjects, deleteProject, updateProject } from "@/app/lib/db/queries";
export async function GET(request: Request) {
  const { data, error } = await selectAllProjects();
  return Response.json({ data, error });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name) return Response.json({ data: null, error: new Error("Missing name") });

  const { data, error } = await createProject({ name: body.name });
  return Response.json({ data, error });
}

export async function PUT(request: Request) {
  const body = await request.json();
  if (!body.name) return Response.json({ data: null, error: new Error("Missing name") });
  if (!body.id) return Response.json({ data: null, error: new Error("Missing id") });

  const { data, error } = await updateProject({ projectId: body.id, projectData: { name: body.name } });
  return Response.json({ data, error });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  if (!body.id) return Response.json({ data: null, error: new Error("Missing Id") });

  const { data, error } = await deleteProject({ projectId: body.id });
  return Response.json({ data, error });
}
