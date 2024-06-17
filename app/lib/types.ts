import * as z from "zod";

export const newProjectFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type NewProjectFormSchemaType = z.infer<typeof newProjectFormSchema>;

export const saveBlockFormSchema = z.object({
  hours: z.number(),
  minutes: z.number(),
  seconds: z.number(),
});

export type SaveBlockFormSchemaType = z.infer<typeof saveBlockFormSchema>;

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
