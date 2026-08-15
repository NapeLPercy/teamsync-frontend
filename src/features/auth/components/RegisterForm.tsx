import React, { useState } from "react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/input/Input";
import Checkbox from "../../../components/ui/checkbox/Checkbox";
import SocialAuth from "./SocialAuth";
import { useRegister } from "../hooks/useRegister";
import "../../../styles/auth.css";

interface CreateAccountValues {
  email: string;
  companyName: string;
  fullName: string;
  password: string;
  acceptTerms: boolean;
}

interface CreateAccountErrors {
  email?: string;
  companyName?: string;
  fullName?: string;
  password?: string;
  acceptTerms?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: CreateAccountValues): CreateAccountErrors {
  const errors: CreateAccountErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.companyName.trim()) {
    errors.companyName = "Company name is required";
  } else if (values.companyName.trim().length < 2) {
    errors.companyName = "Company name is too short";
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Your name is required";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name is too short";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (
    !/[A-Za-z]/.test(values.password) ||
    !/[0-9]/.test(values.password)
  ) {
    errors.password = "Password must include a letter and a number";
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "You must accept the terms to continue";
  }

  return errors;
}

interface CreateAccountFormProps {
  onSubmit?: (values: CreateAccountValues) => Promise<void> | void;
  onLoginClick?: () => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({
  onSubmit,
  onLoginClick,
}) => {
  const [values, setValues] = useState<CreateAccountValues>({
    email: "",
    companyName: "",
    fullName: "",
    password: "",
    acceptTerms: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitError, setSubmitError] = useState<string | null>(null);

  const { data, isPending, isError, error, isSuccess, mutate } = useRegister();

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange =
    (field: keyof CreateAccountValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "acceptTerms" ? e.target.checked : e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleBlur = (field: keyof CreateAccountValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, fullName, companyName } = values;

    mutate({
      email,
      password,
      companyName,
      fullName,
    });
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setTouched({
  //     email: true,
  //     companyName: true,
  //     fullName: true,
  //     password: true,
  //     acceptTerms: true,
  //   });
  //   setSubmitError(null);

  //   if (!isValid) return;

  //   try {
  //     setIsSubmitting(true);
  //     await onSubmit?.(values);
  //   } catch (err) {
  //     setSubmitError(
  //       err instanceof Error ? err.message : "Something went wrong. Try again.",
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Create your account</h1>
      <p className="auth-subtitle">Set up teamsyc for your team in a minute.</p>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
          label="Company name"
          type="text"
          autoComplete="organization"
          value={values.companyName}
          onChange={handleChange("companyName")}
          onBlur={handleBlur("companyName")}
          error={touched.companyName ? errors.companyName : undefined}
          placeholder="Acme Inc."
        />

        <Input
          label="Your name"
          type="text"
          autoComplete="name"
          value={values.fullName}
          onChange={handleChange("fullName")}
          onBlur={handleBlur("fullName")}
          error={touched.fullName ? errors.fullName : undefined}
          placeholder="Jane Doe"
        />

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          error={touched.password ? errors.password : undefined}
          helperText={
            touched.password && !errors.password
              ? undefined
              : "At least 8 characters, with a letter and a number"
          }
          placeholder="••••••••"
        />

        <Checkbox
          label={
            <>
              I accept the{" "}
              <a href="/terms" target="_blank" rel="noreferrer">
                terms of service
              </a>
            </>
          }
          checked={values.acceptTerms}
          onChange={handleChange("acceptTerms")}
          onBlur={handleBlur("acceptTerms")}
          error={touched.acceptTerms ? errors.acceptTerms : undefined}
        />

        {/*success and error */}
        {isError && <div className="auth-submit-error">{error.message}</div>}
        {isSuccess && <div className="auth-submit-success">{data.message}</div>}

        <Button
          type="submit"
          fullWidth
          isLoading={isPending}
          disabled={!isValid}
        >
          Create account
        </Button>
      </form>

      <SocialAuth />

      <div className="auth-footer">
        Already have an account?{" "}
        <a className="auth-link" href="/sign-in" onClick={onLoginClick}>
          Log in
        </a>
      </div>
    </div>
  );
};

export default CreateAccountForm;
