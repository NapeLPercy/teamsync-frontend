import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, CheckCircle2, X, type LucideIcon } from "lucide-react";
import Button from "../button/Button";
import SubmitError from "../states/SubmitError";
import "./Modal.css";

type ConfirmVariant = "primary" | "danger" | "secondary";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: LucideIcon;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  confirmVariant?: ConfirmVariant;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isSuccess?: boolean;
  successMessage?: string;
}

const VARIANT_ICON_CLASS: Record<ConfirmVariant, string> = {
  primary: "cmIconPrimary",
  danger: "cmIconDanger",
  secondary: "cmIconNeutral",
};

export const Modal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  icon: Icon = AlertTriangle,
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  confirmVariant = "primary",
  isLoading = false,
  isError = false,
  errorMessage,
  isSuccess = false,
  successMessage,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const displayIcon = isSuccess ? CheckCircle2 : Icon;
  const iconClass = isSuccess
    ? "cmIconSuccess"
    : VARIANT_ICON_CLASS[confirmVariant];
  const DisplayIcon = displayIcon;

  return createPortal(
    <div className="cmBackdrop" onClick={() => !isLoading && onClose()}>
      <div
        className="cmDialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="cmClose"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <span className={`cmIcon ${iconClass}`}>
          <DisplayIcon size={22} />
        </span>

        <h2 id="confirm-modal-title" className="cmTitle">
          {title}
        </h2>

        <p className="cmMessage">
          {isSuccess ? (successMessage ?? "Done.") : message}
        </p>

        {isError && !isSuccess && (
          <SubmitError
            message={errorMessage ?? "Something went wrong. Try again."}
          />
        )}

        {isSuccess ? (
          <div className="cmActions">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="cmActions">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant={confirmVariant}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

// <Modal
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//           onConfirm={() => deleteTask()}
//           title="Delete Task?"
//           message="This will permanently remove a task and its data. This can't be undone."
//           confirmLabel="Delete"
//           confirmVariant="danger"
//           isLoading={isPending}
//           isError={isError}
//           errorMessage={isError ? error?.message : "Failed to delete task"}
//           isSuccess={isSuccess}
//           successMessage="Task successfully deleted."
//         />
