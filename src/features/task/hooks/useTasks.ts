import {
  addTask,
  getAllTasks,
  getAllTasksByMe,
  getAllTasksForMe,
  deleteTask,
} from "../service/taskApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

//get all tasks by me ADMIN
export function useGetAllTasksByMe() {
  return useQuery<GetTaskResponse>({
    queryKey: ["company_tasks_by_me"],
    queryFn: getAllTasksByMe,
    retry: false,
  });
}

//get all tasks by EMPLOYEE
export function useGetAllTasksForMe() {
  return useQuery<GetTaskResponse>({
    queryKey: ["company_tasks_for_me"],
    queryFn: getAllTasksForMe,
    retry: false,
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["company_tasks_by_me"] });
    },
  });
}
