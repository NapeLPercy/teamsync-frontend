import React from "react";
import { Inbox, type LucideIcon } from "lucide-react";
import Button from "../button/Button";
import "./EmptyState.css";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  message = "There's no data to show right now.",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="emptyState">
      <Icon size={22} className="emptyStateIcon" aria-hidden="true" />
      <span className="emptyStateTitle">{title}</span>
      <span className="emptyStateMessage">{message}</span>
      {actionLabel && onAction && (
        <Button type="button" variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;