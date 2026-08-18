import React, { useId } from "react";
import { ChevronDown } from "lucide-react";
import "./Select.css";

export type SelectOption = string | { label: string; value: string };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = "", id, ...rest }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div className="selectGroup">
        {label && (
          <label className="selectLabel" htmlFor={selectId}>
            {label}
          </label>
        )}

        <div className="selectWrapper">
          <select
            ref={ref}
            id={selectId}
            className={["selectField", error ? "selectError" : "", className]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={!!error}
            aria-describedby={error || helperText ? `${selectId}-helper` : undefined}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => {
              const value = typeof option === "string" ? option : option.value;
              const optionLabel = typeof option === "string" ? option : option.label;
              return (
                <option key={value} value={value}>
                  {optionLabel}
                </option>
              );
            })}
          </select>
          <ChevronDown size={16} className="selectChevron" aria-hidden="true" />
        </div>

        {(error || helperText) && (
          <span
            id={`${selectId}-helper`}
            className={["selectHelper", error ? "selectHelperError" : ""]
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

Select.displayName = "Select";

export default Select;