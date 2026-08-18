import { getEmployeesDetails } from "../services/employeeDetailsAPI";
import { useQuery } from "@tanstack/react-query";

export interface GetEmployeesResponse {
  employees: Employee[];
}

export interface Employee {
  userId: string;
  isActive: boolean;
  fullName: string;
}

export function useGetEmployeesDetails() {
  return useQuery<GetEmployeesResponse>({
    queryKey: ["employees_details"],
    queryFn: getEmployeesDetails,
    retry: false,
  });
}
