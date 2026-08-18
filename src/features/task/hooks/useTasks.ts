import { addTask, getAllTasks } from "../service/taskApi";
import { useQuery, useMutation } from "@tanstack/react-query";

export interface GetTaskResponse {
  tasks: Task[];
}
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
}

//add task
export function useAddTask() {
  return useMutation({
    mutationFn: addTask,
  });
}

//get all tasks
export function useGetAllTasks() {
  return useQuery<GetTaskResponse>({
    queryKey: ["company_tasks"],
    queryFn: getAllTasks,
    retry: false,
  });
}
