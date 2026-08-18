import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "../button/Button";
import "./ErrorState.css";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong. Please try again.",
  onRetry,
  isRetrying = false,
}) => {
  return (
    <div className="errorState" role="alert">
      <AlertCircle size={22} className="errorStateIcon" aria-hidden="true" />
      <span className="errorStateText">{message}</span>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onRetry}
        isLoading={isRetrying}
      >
        {!isRetrying && <RefreshCw size={14} />}
        Retry
      </Button>
    </div>
  );
};

export default ErrorState;