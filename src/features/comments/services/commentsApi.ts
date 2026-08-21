import apiClient from "../../../services/api/client";
import type { CommentData, CommentsResponse } from "../types/comment";
/*Add a comment*/

export function addComment(data: CommentData) {

  return apiClient("/api/comments/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/*View comment */
export function getComments(taskId: string) {
  return apiClient<CommentsResponse>(`/api/comments/${taskId}`, {
    method: 'GET',
  });
}

