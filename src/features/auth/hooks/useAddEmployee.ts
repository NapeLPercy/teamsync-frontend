import { addEmployee } from "../services/authApi";
import { useMutation } from "@tanstack/react-query";


export function useAddEmployee() {
  return useMutation({
    mutationFn: addEmployee,
  });
}
