import apiClient from "../../../services/api/client";


// interface GetEmployeesResponse {
//   Employee: [];
// }

// export interface Employee {
//   userId: string;
//   fullName: string;
//   role: string;
//   isActive: boolean;
//   email: string;
//   status: string;
//   created_at: string;
// }

// export function fetchAllEmployees<GetEmployeesResponse>() {
//   return apiClient("/api/admin/employess", {
//     method: "GET",
//   });
// }

export interface GetEmployeesResponse {
  employees: Employee[]; // was `[]` — that pins it to always-empty
}

export interface Employee {
  userId: string;
  fullName: string;
  role: string;
  isActive: boolean;
  email: string;
  status: string;
  createdAt: Date;
}

export function fetchAllEmployees(): Promise<GetEmployeesResponse> {
  return apiClient("/api/admin/employees", {
    method: "GET",
  });
}
