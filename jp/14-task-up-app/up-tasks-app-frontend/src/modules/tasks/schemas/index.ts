import { z } from "zod";

export type TaskStatus =
  | "PENDING"
  | "ON_HOLD"
  | "IN_PROGRESS"
  | "UNDER_REVIEW"
  | "COMPLETED";

export const TaskStatusValues = {
  PENDING: "PENDING",
  ON_HOLD: "ON_HOLD",
  IN_PROGRESS: "IN_PROGRESS",
  UNDER_REVIEW: "UNDER_REVIEW",
  COMPLETED: "COMPLETED",
};

export const TaskStatusSchemas = z.enum([
  "PENDING",
  "ON_HOLD",
  "IN_PROGRESS",
  "UNDER_REVIEW",
  "COMPLETED",
]);

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: TaskStatusSchemas,
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});
