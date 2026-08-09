import React, { useId } from "react";
import "./Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="input-group">
        {label && (
          <label className="input-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={["input-field", error ? "input-error" : "", className]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={!!error}
          aria-describedby={error || helperText ? `${inputId}-helper` : undefined}
          {...rest}
        />
        {(error || helperText) && (
          <span
            id={`${inputId}-helper`}
            className={["input-helper", error ? "input-helper-error" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;