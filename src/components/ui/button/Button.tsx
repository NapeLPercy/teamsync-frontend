import React from "react";
import { Loader2 } from "lucide-react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled,
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      "btn",
      `btn-${variant}`,
      size !== "md" ? `btn-${size}` : "",
      fullWidth ? "btn-full" : "",
      isLoading ? "btn-loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...rest}
      >
        {isLoading && <Loader2 className="btn-spinner" size={16} aria-hidden="true" />}
        <span className={isLoading ? "btn-label-loading" : undefined}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;