import type { z } from "zod";
import type { TaskSchema, TaskStatusSchemas } from "../schemas";

export type Task = z.infer<typeof TaskSchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchemas>

export type TaskFormData = Pick<Task, "name" | "description">;
