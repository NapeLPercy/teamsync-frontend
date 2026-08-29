import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../services/projectApi";

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company_projects"] });
      queryClient.invalidateQueries({ queryKey: ["company_projects_by_me"] });
    },
  });
}
