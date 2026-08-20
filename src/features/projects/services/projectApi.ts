import apiClient from "../../../services/api/client";

/*ADMIN ADD PROJECT */
export interface ProjectData {
  name: string;
  description: string;
  dueDate: string;
  category: string;
}
export function addproject(data: ProjectData) {
  return apiClient("/api/projects/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/*VIEW PROJECTS */
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

//get all company projects
export function getCompanyProjects() {
  return apiClient<GetProjectResponse>("/api/projects/", {
    method: "GET",
  });
}
//get projects by one role
export function getCompanyProjectsByMe() {
  return apiClient<GetProjectResponse>("/api/projects/my", {
    method: "GET",
  });
}

/*PROJECTS DETAILS */
export interface ProjectsDetailsResponse {
  projects: ProjectsDetails[];
}
export interface ProjectsDetails {
  id: string;
  name: string;
  dueDate: string;
}
export function getProjectsDetails() {
  return apiClient<ProjectsDetailsResponse>("/api/projects/details", {
    method: "GET",
  });
}
