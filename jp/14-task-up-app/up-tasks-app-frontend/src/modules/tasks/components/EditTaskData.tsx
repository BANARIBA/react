import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router";
import { getTaskById } from "../services/task.service";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  const location = useLocation();
  const params = useParams();
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get("editTask")!;
  const projectId = params.projectId || "";

  const {data, isError} = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId, // Only run the query if taskId is available
    retry: false,
  });

  if (isError) return <Navigate to="404" />;
  if (data) return <EditTaskModal data={data} taskId={taskId} projectId={projectId} />;
}
