import ViewProjects from "./ui/ViewProjects";
import { useGetCompanyProjectsByMe } from "../hooks/useGetProjects";
import ErrorState from "../../../components/ui/states/ErrorState";
import LoadingState from "../../../components/ui/states/LoadingState";
import EmptyState from "../../../components/ui/states/EmptyState";

export function CompanyProjectsByMe() {
  const { data, isError, error, isPending } = useGetCompanyProjectsByMe();

  if (isPending)
    return <LoadingState text="Loading company Projects created by You" />;
  if (data?.projects?.length === 0) return <EmptyState />;
  if (isError)
    return (
      <ErrorState
        message={error.message}
        onRetry={useGetCompanyProjectsByMe}
        isRetrying={isPending}
      />
    );

  return (
    <>
      <ViewProjects
        headerText="Company projects"
        subText="View and manage all projects created by you"
        projects={data?.projects}
        role="ADMIN"
        onDelete={(id: string) => {}}
      />
    </>
  );
}
