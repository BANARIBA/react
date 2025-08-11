import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getProjectById } from "../services/projects.service";
import Spinner from "../../../shared/components/Spinner";
import EditProjectForm from "../components/EditProjectForm";

export default function EditProjectView() {
  const params = useParams();
  const projectId: string = params.projectId as string;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <Spinner />;

  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <EditProjectForm
        data={{
          clientName: data.clientName,
          description: data.description,
          projectName: data.projectName,
        }}
        projectId={projectId}
      />
    );
}
