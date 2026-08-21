import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send, Plus, X } from "lucide-react";
import { useGetComments, useAddComment } from "../hooks/useComments";
import LoadingState from "../../../components/ui/states/LoadingState";
import ErrorState from "../../../components/ui/states/ErrorState";
import EmptyState from "../../../components/ui/states/EmptyState";
import "../styles/CommentsPage.css";
import { useLocation } from "react-router-dom";
import TaskCommentsHeader from "./ui/TaskCommentsHeader";
export interface CommentData {
  content: string;
  taskId: string;
}


function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export const CommentsPage: React.FC = () => {
  const { task } = useLocation().state;
  const { data, isLoading, isError, error, refetch } = useGetComments(task.id);
  const {
    mutate,
    isPending,
    isError: isSubmitError,
    isSuccess,
    error: submitError,
  } = useAddComment();

  const [content, setContent] = useState("");
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const comments = useMemo(
    () =>
      [...(data?.comments ?? [])].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [data],
  );

  useEffect(() => {
    if (isSuccess) {
      setContent("");
      setIsMobileFormOpen(false);
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    mutate({ content: trimmed, taskId: task.id });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  //   const handleDeleteComment = (task) => {
  //     alert(task.id);
  //   };

  const renderForm = () => (
    <form className="tcForm" onSubmit={handleSubmit}>
      <div className="tcFormHeader">
        <span className="tcFormTitle">Add a comment</span>
        <button
          type="button"
          className="tcMobileClose"
          onClick={() => setIsMobileFormOpen(false)}
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {isSubmitError && (
        <div className="tcFormError">
          {submitError instanceof Error
            ? submitError.message
            : "Couldn't post your comment."}
        </div>
      )}

      {isSuccess && (
        <div className="tcFormSuccess">Comment successfully submitted</div>
      )}
      <textarea
        ref={textareaRef}
        className="tcTextarea"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
      />

      <button
        type="submit"
        className="tcSendButton"
        disabled={!content.trim() || isPending}
      >
        {isPending ? (
          "Posting..."
        ) : (
          <>
            <Send size={15} />
            Post comment
          </>
        )}
      </button>
    </form>
  );

  return (
    <div className="taskCommentsPage">
      <TaskCommentsHeader task={task} comments={comments} />

      <div className="tcLayout">
        <div className="tcListPanel">
          {isLoading && <LoadingState text="Loading comments..." />}

          {isError && (
            <ErrorState
              message={
                error instanceof Error
                  ? error.message
                  : "Couldn't load comments."
              }
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !isError && comments.length === 0 && (
            <EmptyState
              title="No comments yet"
              message="Be the first to add a comment."
            />
          )}

          {!isLoading &&
            !isError &&
            comments.map((comment) => (
              <div className="tcComment" key={comment.id}>
                <span className="tcAvatar">
                  {getInitials(comment.fullName)}
                </span>
                <div className="tcCommentBody">
                  <div className="tcCommentMeta">
                    <span className="tcCommentName">{comment.fullName}</span>
                    <span className="tcCommentRole">{comment.role}</span>
                    <span className="tcCommentDate">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="tcCommentText">{comment.content}</p>
                </div>
                {/* <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => handleDeleteComment(comment)}
                >
                  Delete
                </Button> */}
              </div>
            ))}
        </div>

        <aside className="tcFormPanel">{renderForm()}</aside>
      </div>

      {isMobileFormOpen && (
        <div
          className="tcMobileBackdrop"
          onClick={() => setIsMobileFormOpen(false)}
        />
      )}

      <div
        className={`tcMobileFormSheet ${isMobileFormOpen ? "tcMobileFormOpen" : ""}`}
      >
        {renderForm()}
      </div>

      <button
        type="button"
        className="tcMobileFab"
        onClick={() => setIsMobileFormOpen(true)}
      >
        <Plus size={18} />
        Add comment
      </button>
    </div>
  );
};

export default CommentsPage;
