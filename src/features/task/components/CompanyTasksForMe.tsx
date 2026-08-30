import { useGetAllTasksForMe } from "../hooks/useTasks";
import ViewTasks from "./ui/ViewTasks";
import LoadingState from "../../../components/ui/states/LoadingState";
import EmptyState from "../../../components/ui/states/EmptyState";
import ErrorState from "../../../components/ui/states/ErrorState";

export function CompanyTasksForMe() {
  const { data, isLoading, isError, error, refetch } = useGetAllTasksForMe();

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
        message="Tasks created for you will show up here."
      />
    );
  }

  return (
    <ViewTasks
      headerText="Company tasks"
      subText="All tasks created for you."
      tasks={tasks}
      user={"EMPLOYEE"}
    />
  );
}

export default CompanyTasksForMe;
