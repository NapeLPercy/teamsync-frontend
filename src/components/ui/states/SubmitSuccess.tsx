import React from "react";
import "./SubmitSuccess.css";

interface SubmitSuccessProps {
  message: string;
}

export const SubmitSuccess: React.FC<SubmitSuccessProps> = ({ message }) => {
  return <div className="submitSuccess">{message}</div>;
};

export default SubmitSuccess;