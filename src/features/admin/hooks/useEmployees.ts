import { fetchAllEmployees, deleteEmployee } from "../services/adminApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    retry: false,
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (employeeId: string) => deleteEmployee(employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all_employees"] });
    },
  });
}
