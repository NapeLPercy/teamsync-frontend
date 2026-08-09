import React, { useId } from "react";
import "./Checkbox.css";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div>
        <div className="checkbox-row">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={["checkbox-input", className].filter(Boolean).join(" ")}
            aria-invalid={!!error}
            {...rest}
          />
          <label className="checkbox-label" htmlFor={inputId}>
            {label}
          </label>
        </div>
        {error && <div className="checkbox-error">{error}</div>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;