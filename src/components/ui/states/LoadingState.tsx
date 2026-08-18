import React from "react";
import { Loader2 } from "lucide-react";
import "./LoadingState.css";

interface LoadingStateProps {
  text?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ text = "Loading..." }) => {
  return (
    <div className="loadingState" role="status" aria-live="polite">
      <Loader2 size={22} className="loadingStateSpinner" aria-hidden="true" />
      <span className="loadingStateText">{text}</span>
    </div>
  );
};

export default LoadingState;