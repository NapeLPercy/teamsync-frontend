import { addComment, getComments } from "../services/commentsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CommentsResponse } from "../types/comment";

export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables: any) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.taskId],
      });
    },
  });
}

export function useGetComments(taskId: string) {
  return useQuery<CommentsResponse>({
    queryKey: ["comments", taskId],
    queryFn: () => getComments(taskId),
    enabled: !!taskId,
  });
}
