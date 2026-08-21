export interface CommentData {
  content: string;
  taskId: string;
}

export interface Comment {
  id: string;
  content: string;
  fullName: string;
  createdAt: string;
  role: string;
}

export interface CommentsResponse {
  comments: Comment[];
}
