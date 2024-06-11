import * as z from "zod";

export const newProjectFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type NewProjectFormSchemaType = z.infer<typeof newProjectFormSchema>;

export type ProjectColumns =
  | "index"
  | "name"
  | "totalTime"
  | "currentTime"
  | "isActive"
  | "controls"
  | "edit"
  | "alerts"
  | "overtimeThreshold";
