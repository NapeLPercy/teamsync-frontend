import { useGetAllTasks } from "../hooks/useTasks";
import ViewTasks from "./ui/ViewTasks";
import LoadingState from "../../../components/ui/states/LoadingState";
import EmptyState from "../../../components/ui/states/EmptyState";
import ErrorState from "../../../components/ui/states/ErrorState";

export function CompanyTasks() {
  const { data, isLoading, isError, error, refetch } = useGetAllTasks();

  const tasks = data?.tasks ?? [];


  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) return;

    // wire up your delete mutation here, e.g.:
    // deleteTask(id);
  };

  if (isLoading) {
    return <LoadingState text="Loading tasks..." />;
  }

  if (isError) {
    return (
      <ErrorState
        message={
          error instanceof Error ? error.message : "Couldn't load tasks."
        }
        onRetry={() => refetch()}
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        message="Tasks created across your company will show up here."
      />
    );
  }

  return (
    <ViewTasks
      headerText="Company tasks"
      subText="All tasks across your organization."
      tasks={tasks}
      user={"ADMIN"}
      onDelete={handleDelete}
    />
  );
}

export default CompanyTasks;
