import { isAxiosError } from "axios";
import type { Task, TaskFormData } from "../types";
import api from "../../../shared/api/axios.,api";
import type { Project } from "../../projects/types";
import type { TaskStatus } from "../schemas";

type CreateTaskDto = {
  taskFormData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: TaskStatus;
};

export async function createTask(
  createTaskDto: Pick<CreateTaskDto, "taskFormData" | "projectId">
) {
  try {
    const { data } = await api.post<string>(
      `/tasks/project/${createTaskDto.projectId}`,
      createTaskDto.taskFormData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function getTaskById({
  projectId,
  taskId,
}: Pick<CreateTaskDto, "projectId" | "taskId">) {
  try {
    const { data } = await api.get<Task>(
      `/tasks/project/${projectId}/task/${taskId}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function editTaskById({
  taskFormData,
  projectId,
  taskId,
}: Pick<CreateTaskDto, "projectId" | "taskId" | "taskFormData">) {
  try {
    const { data } = await api.patch<Task>(
      `/tasks/project/${projectId}/task/${taskId}`,
      taskFormData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function chageTaskStatus({
  projectId,
  taskId,
  status,
}: Pick<CreateTaskDto, "projectId" | "taskId" | "status">) {
  try {
    const { data } = await api.post<Task>(
      `tasks/project/${projectId}/task/${taskId}/change-status`,
      {status}
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function deleteTask({
  projectId,
  taskId,
}: Pick<CreateTaskDto, "projectId" | "taskId">) {
  try {
    const { data } = await api.delete<string>(
      `/tasks/project/${projectId}/task/${taskId}`
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}
