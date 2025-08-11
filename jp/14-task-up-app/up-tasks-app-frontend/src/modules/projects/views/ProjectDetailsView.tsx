import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router";
import { getProjectById } from "../services/projects.service";
import Spinner from "../../../shared/components/Spinner";
import AddTaskModal from "../../tasks/components/AddTaskModal";
import TaskList from "../../tasks/components/TaskList";
import EditTaskData from "../../tasks/components/EditTaskData";
import TaskModalDetails from "../../tasks/components/TaskModalDetails";

export default function ProjectDetailsView() {
  const params = useParams();
  const navigate = useNavigate();
  const projectId: string = params.projectId || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Navigate to="/" replace />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 text-white px-10 py-3 text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(`?newTask=true`)}
          >
            Agregar Tarea
          </button>
        </nav>
        <TaskList tasks={data.tasks}/>
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
