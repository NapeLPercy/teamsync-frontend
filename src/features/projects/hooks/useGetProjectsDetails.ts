import { getProjectsDetails } from "../services/projectApi";
import { useQuery } from "@tanstack/react-query";

export interface ProjectsDetailsResponse {
  projects: ProjectsDetails[];
}
export interface ProjectsDetails {
  id: string;
  name: string;
}
export function useGetProjectsDetails() {
  return useQuery<ProjectsDetailsResponse>({
    queryKey: ["projects_details"],
    queryFn: getProjectsDetails,
    retry: false,
  });
}
