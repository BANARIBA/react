import { isAxiosError } from "axios";
import type { Project, ProjectFormData } from "../types";
import api from "../../../shared/api/axios.,api";
import { DashboardProjectSchema } from "../schemas";

type UpdateProjectFormData = {
  projectId: Project["_id"];
  projectFormData: ProjectFormData;
}

export async function createProject(projectFormData: ProjectFormData) {
  try {
    const { data } = await api.post<Project>(`/projects`, projectFormData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function getProjects() {
  try {
    const { data } = await api.get<Project[]>("/projects");
    const response = DashboardProjectSchema.safeParse(data);
    if (response.error) throw new Error(response.error.message);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data["message"]);
    throw new Error(`${error}`);
  }
}

export async function getProjectById(projectId: Project["_id"]) {
  try {
    const { data } = await api.get<Project>(`/projects/${projectId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function updateProject(updateProjectFormData: UpdateProjectFormData) {
  try {
    const { data } = await api.patch<Project>(
      `/projects/${updateProjectFormData.projectId}`,
      updateProjectFormData.projectFormData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}

export async function deleteProject(projectId: Project["_id"]) {
  try {
    const { data } = await api.delete<Project>(`/projects/${projectId}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data["message"]);
    }
    throw new Error(`${error}`);
  }
}
