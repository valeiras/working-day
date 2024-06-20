import * as z from "zod";

export const newProjectFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type NewProjectFormSchemaType = z.infer<typeof newProjectFormSchema>;

export const saveBlockFormSchema = z.object({
  hours: z.coerce.number(),
  minutes: z.coerce.number(),
  seconds: z.coerce.number(),
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

export type ChartType = "Bar Chart" | "Line Chart";
