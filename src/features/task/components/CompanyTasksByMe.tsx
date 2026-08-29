import { useGetAllTasksByMe } from "../hooks/useTasks";
import ViewTasks from "./ui/ViewTasks";
import LoadingState from "../../../components/ui/states/LoadingState";
import EmptyState from "../../../components/ui/states/EmptyState";
import ErrorState from "../../../components/ui/states/ErrorState";

export function CompanyTasksByMe() {
  const { data, isLoading, isError, error, refetch } = useGetAllTasksByMe();

  const tasks = data?.tasks ?? [];

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
        message="Tasks created by you will show up here."
      />
    );
  }

  return (
    <ViewTasks
      headerText="Company tasks"
      subText="All tasks created by you."
      tasks={tasks}
      user={"ADMIN"}
    />
  );
}

export default CompanyTasksByMe;
