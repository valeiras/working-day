import { selectAllProjectsWithWorkingTimes } from "@/app/lib/db/queries";

export async function GET(request: Request) {
  const { data, error } = await selectAllProjectsWithWorkingTimes();
  return Response.json({ data, error });
}
