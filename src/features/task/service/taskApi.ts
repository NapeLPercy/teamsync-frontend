import apiClient from "../../../services/api/client";

/*ADD TASK*/
export interface TaskData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  projectId: string;
  assignedTo: string;
}

export function addTask(data: TaskData) {
  return apiClient("/api/tasks/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/*GET TASKS */

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

/*DELETE TASK */

export function getAllTasks() {
  return apiClient<GetTaskResponse>("/api/tasks/", {
    method: "GET",
  });
}

export function getAllTasksByMe() {
  return apiClient<GetTaskResponse>("/api/tasks/my", {
    method: "GET",
  });
}

export function getAllTasksForMe() {
  return apiClient<GetTaskResponse>("/api/tasks/for_me", {
    method: "GET",
  });
}
export function deleteTask(taskId: string) {
  return apiClient(`/api/tasks/${taskId}`, {
    method: "DELETE",
  });
}
