import React, { useState } from "react";
import Button from "../../../components/ui/button/Button";
import { Input } from "../../../components/ui/input/Input";
import { Checkbox } from "../../../components/ui/checkbox/Checkbox";
import SocialAuth from "./SocialAuth";
import "../../../styles/auth.css";

interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: LoginValues): LoginErrors {
  const errors: LoginErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}

interface LoginFormProps {
  onSubmit?: (values: LoginValues) => Promise<void> | void;
  onCreateAccountClick?: () => void;
  onForgotPasswordClick?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onCreateAccountClick,
  onForgotPasswordClick,
}) => {
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange =
    (field: keyof LoginValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "rememberMe" ? e.target.checked : e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleBlur = (field: keyof LoginValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setSubmitError(null);

    if (!isValid) return;

    try {
      setIsSubmitting(true);
      await onSubmit?.(values);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Invalid email or password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Log in</h1>
      <p className="auth-subtitle">Welcome back to teamsyc.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {submitError && <div className="auth-submit-error">{submitError}</div>}

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          error={touched.email ? errors.email : undefined}
          placeholder="you@company.com"
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          error={touched.password ? errors.password : undefined}
          placeholder="••••••••"
        />

        <div className="auth-row">
          <Checkbox
            label="Remember me"
            checked={values.rememberMe}
            onChange={handleChange("rememberMe")}
          />
          <a
            className="auth-link"
            href="/forgot-password"
            onClick={onForgotPasswordClick}
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          disabled={!isValid}
        >
          Log in
        </Button>
      </form>

      <SocialAuth />

      <div className="auth-footer">
        Don&apos;t have an account?{" "}
        <a className="auth-link" href="/sign-up" onClick={onCreateAccountClick}>
          Create one
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
