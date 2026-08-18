import { fetchAllEmployees } from "../services/adminApi";
import { useQuery } from "@tanstack/react-query";
// import GetEmployeesResponse from "../services/adminApi";

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

export function useGetAllEmployees() {
  return useQuery<GetEmployeesResponse>({
    queryKey: ["all_employees"],
    queryFn: fetchAllEmployees,
    retry:false
  });
}
