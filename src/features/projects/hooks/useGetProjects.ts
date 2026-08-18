import {
  getCompanyProjects,
  getCompanyProjectsByMe,
} from "../services/projectApi";
import { useQuery } from "@tanstack/react-query";

export interface GetProjectResponse {
  projects: Project[];
}
export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  dueDate: string;
}

//Get all company Projects
export function useGetCompanyProjects() {
  return useQuery<GetProjectResponse>({
    queryKey: ["company_projects"],
    queryFn: getCompanyProjects,
    retry: false,
  });
}

//get projects by one role
export function useGetCompanyProjectsByMe() {
  return useQuery<GetProjectResponse>({
    queryKey: ["company_projects_by_me"],
    queryFn: getCompanyProjectsByMe,
    retry: false,
  });
}
