import React, { useEffect, useState } from "react";
import { useAddEmployee } from "../hooks/useAddEmployee";
import { Button } from "../../../components/ui/button/Button";
import Input from "../../../components/ui/input/Input";
import Select from "../../../components/ui/select/Select";
import "../styles/AddEmployee.css";

interface AddEmployeeValues {
  name: string;
  email: string;
  role: string;
}

interface AddEmployeeErrors {
  name?: string;
  email?: string;
  role?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: AddEmployeeValues): AddEmployeeErrors {
  const errors: AddEmployeeErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name is too short";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.role.trim()) {
    errors.email = "Role is required";
  }

  return errors;
}

export const AddEmployee: React.FC = () => {
  const { mutate, isPending, isError, isSuccess, error } = useAddEmployee();

  const [values, setValues] = useState<AddEmployeeValues>({
    name: "",
    email: "",
    role: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (isSuccess) {
      setValues({ name: "", email: "", role: "" });
      setTouched({});
    }
  }, [isSuccess]);

  const handleChange =
    (field: keyof AddEmployeeValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleBlur =
    (field: keyof AddEmployeeValues) =>
    (_e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });

    if (!isValid) return;

    const { name, email, role } = values;
    mutate({
      fullName: name.trim(),
      email: email.trim(),
      role: role
    });
  };

  return (
    <div className="addEmployeePage">
      <div className="addEmployeeHeader">
        <h1 className="addEmployeeTitle">Add employee</h1>
        <p className="addEmployeeSubtitle">
          Invite a new employee to your organization.
        </p>
      </div>

      <form className="addEmployeeCard" onSubmit={handleSubmit} noValidate>
        {isError && (
          <div className="addEmployeeError">
            {error instanceof Error
              ? error.message
              : "Something went wrong. Try again."}
          </div>
        )}

        {isSuccess && (
          <div className="addEmployeeSuccess">Employee added successfully.</div>
        )}

        <div className="addEmployeeGrid">
          <Input
            label="Full name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={touched.name ? errors.name : undefined}
            placeholder="Jane Doe"
          />

          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={touched.email ? errors.email : undefined}
            placeholder="jane@company.com"
          />
        </div>

        <Select
          label="Role"
          options={["EMPLOYEE"]}
          placeholder="Select a role"
          value={values.role}
          onChange={handleChange("role")}
          onBlur={handleBlur("role")}
          error={touched.role ? errors.role : undefined}
        />

        <div className="addEmployeeActions">
          <Button type="submit" isLoading={isPending} disabled={!isValid}>
            Add employee
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
