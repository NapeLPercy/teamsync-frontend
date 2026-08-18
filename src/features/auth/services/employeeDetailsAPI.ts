import apiClient from "../../../services/api/client";

export interface GetEmployeesDetailsResponse {
  employees: Employee[]; // was `[]` — that pins it to always-empty
}
export interface Employee {
  userId: string;
  isActive: boolean;
  fullName: string;
}
export function getEmployeesDetails() {
  return apiClient<GetEmployeesDetailsResponse>("/api/auth/employees", {
    method: "GET",
  });
}
