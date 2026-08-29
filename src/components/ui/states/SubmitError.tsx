import React from "react";
import "./SubmitError.css";

interface SubmitErrorProps {
  message: string;
}

export const SubmitError: React.FC<SubmitErrorProps> = ({ message }) => {
  return <div className="submitError">{message}</div>;
};

export default SubmitError;