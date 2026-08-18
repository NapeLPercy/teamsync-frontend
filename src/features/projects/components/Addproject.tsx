import React, { useState } from "react";
import { useAddProject } from "../hooks/useAddProject";
import Input from "../../../components/ui/input/Input";
import { Select } from "../../../components/ui/select/Select";
import Button from "../../../components/ui/button/Button";
import "../styles/AddProject.css";

interface AddProjectValues {
  name: string;
  description: string;
  dueDate: string;
  category: string;
}

interface AddProjectErrors {
  name?: string;
  description?: string;
  dueDate?: string;
  category?: string;
}

function validate(values: AddProjectValues): AddProjectErrors {
  const errors: AddProjectErrors = {};

  if (!values.name.trim()) {
    errors.name = "Project name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Project name is too short";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  } else if (values.description.trim().length < 10) {
    errors.description = "Add a bit more detail (at least 10 characters)";
  }

  if (!values.dueDate) {
    errors.dueDate = "Due date is required";
  } else if (new Date(values.dueDate) < new Date(new Date().toDateString())) {
    errors.dueDate = "Due date can't be in the past";
  }

  if (!values.category) {
    errors.category = "Select a category";
  }
  return errors;
}

// project categry
const CATEGORY_OPTIONS = [
  { label: "Content", value: "CONTENT" },
  { label: "Marketing", value: "MARKETING" },
  { label: "New Clients", value: "NEW_CLIENTS" },
];

export const AddProject: React.FC = () => {
  const { mutate, isPending, isError, isSuccess, error } = useAddProject();

  const [values, setValues] = useState<AddProjectValues>({
    name: "",
    description: "",
    dueDate: "",
    category: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange =
    (field: keyof AddProjectValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleBlur = (field: keyof AddProjectValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ assigneeId: true, name: true, description: true });

    if (!isValid) return;

    mutate({
      name: values.name.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate,
      category: values.category,
    });
  };

  return (
    <div className="addProjectPage">
      <div className="addProjectHeader">
        <h1 className="addProjectTitle">Add project</h1>
        <p className="addProjectSubtitle">
          Create a project and assign it to a team member.
        </p>
      </div>

      <form className="addProjectCard" onSubmit={handleSubmit} noValidate>
        {isError && (
          <div className="addProjectError">
            {error instanceof Error
              ? error.message
              : "Something went wrong. Try again."}
          </div>
        )}

        {isSuccess && (
          <div className="addProjectSuccess">Project created successfully.</div>
        )}

        <div className="addProjectGrid">
          <Input
            label="Project name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={touched.name ? errors.name : undefined}
            placeholder="Website redesign"
          />

          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            placeholder="Select a category"
            value={values.category}
            onChange={handleChange("category")}
            onBlur={handleBlur("category")}
            error={touched.category ? errors.category : undefined}
          />
        </div>

        <Input
          label="Due date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={values.dueDate}
          onChange={handleChange("dueDate")}
          onBlur={handleBlur("dueDate")}
          error={touched.dueDate ? errors.dueDate : undefined}
        />

        <div className="addProjectGrid">
          <div className="addProjectFieldFull">
            <label
              className="addProjectTextareaLabel"
              htmlFor="project-description"
            >
              Description
            </label>
            <textarea
              id="project-description"
              className={`addProjectTextarea ${
                touched.description && errors.description
                  ? "addProjectTextareaError"
                  : ""
              }`}
              value={values.description}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="What is this project about?"
              rows={4}
            />
            {touched.description && errors.description && (
              <span className="addProjectTextareaHelper">
                {errors.description}
              </span>
            )}
          </div>
        </div>

        <div className="addProjectActions">
          <Button type="submit" isLoading={isPending} disabled={!isValid}>
            Create project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
