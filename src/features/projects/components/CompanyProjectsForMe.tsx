import ViewProjects from "./ui/ViewProjects";
import { useGetCompanyProjectsForMe } from "../hooks/useGetProjects";
import ErrorState from "../../../components/ui/states/ErrorState";
import LoadingState from "../../../components/ui/states/LoadingState";
import EmptyState from "../../../components/ui/states/EmptyState";

export function CompanyProjectsForMe() {
  const { data, isError, error, isPending } = useGetCompanyProjectsForMe();

  if (isPending)
    return <LoadingState text="Loading company Projects you are a part of" />;
  if (data?.projects?.length === 0) return <EmptyState />;
  if (isError)
    return (
      <ErrorState
        message={error.message}
        onRetry={useGetCompanyProjectsForMe}
        isRetrying={isPending}
      />
    );

  return (
    <>
      <ViewProjects
        headerText="Company projects"
        subText="View all projects created for you"
        projects={data?.projects}
        role="EMPLOYEE"
      />
    </>
  );
}
