import * as z from "zod";

export const ProjectFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type ProjectFormSchemaType = z.infer<typeof ProjectFormSchema>;

export const saveBlockFormSchema = z.object({
  hours: z.coerce.number(),
  minutes: z.coerce.number(),
  seconds: z.coerce.number(),
});

export type SaveBlockFormSchemaType = z.infer<typeof saveBlockFormSchema>;

const dateRangeEnum = z.enum(["Past week", "Past month", "This week", "This month", "Custom range"]);
export type DateRangeType = z.infer<typeof dateRangeEnum>;

export const selectDateRangeFormSchema = z.object({
  initialDate: z.date(),
  endDate: z.date(),
  dateRange: dateRangeEnum,
});

export type SelectDateRangeFormSchemaType = z.infer<typeof selectDateRangeFormSchema>;

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
