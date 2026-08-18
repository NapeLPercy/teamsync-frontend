import ViewProjects from "./ui/ViewProjects";
import { useGetCompanyProjects } from "../hooks/useGetProjects";
import ErrorState from "../../../components/ui/states/ErrorState";
import LoadingState from "../../../components/ui/states/LoadingState";
import EmptyState from "../../../components/ui/states/EmptyState";

export function CompanyProjects() {
  const { data, isError, error, isPending } = useGetCompanyProjects();

  if (isPending) return <LoadingState text="Loading all company Projects" />;
  if (data?.projects?.length === 0) return <EmptyState />;
  if (isError)
    return (
      <ErrorState
        message={error.message}
        onRetry={useGetCompanyProjects}
        isRetrying={isPending}
      />
    );

  return (
    <>
      <ViewProjects
        headerText="Company projects"
        subText="View and manage all projects in your company"
        projects={data?.projects}
        role="ADMIN"
        onDelete={(id: string) => {}}
      />
    </>
  );
}
