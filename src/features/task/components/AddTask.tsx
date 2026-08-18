import React, { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { useGetEmployeesDetails } from "../../auth/hooks/useEmployeesDetails";
import { useGetProjectsDetails } from "../../projects/hooks/useGetProjectsDetails";
import { useAddTask } from "../hooks/useTasks";
import Input from "../../../components/ui/input/Input";
import {
  Select,
  type SelectOption,
} from "../../../components/ui/select/Select";
import Button from "../../../components/ui/button/Button";
import "../styles/AddTask.css";

export interface TaskData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  projectId: string;
  assignedTo: string;
}

interface TaskErrors {
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string;
  projectId?: string;
  assignedTo?: string;
}

const PRIORITY_OPTIONS: SelectOption[] = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
];

function validate(values: TaskData): TaskErrors {
  const errors: TaskErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required";
  } else if (values.title.trim().length < 2) {
    errors.title = "Title is too short";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  } else if (values.description.trim().length < 10) {
    errors.description = "Add a bit more detail (at least 10 characters)";
  }

  if (!values.priority) {
    errors.priority = "Select a priority";
  }

  if (!values.dueDate) {
    errors.dueDate = "Due date is required";
  } else if (new Date(values.dueDate) < new Date(new Date().toDateString())) {
    errors.dueDate = "Due date can't be in the past";
  }

  if (!values.projectId) {
    errors.projectId = "Select a project";
  }

  if (!values.assignedTo) {
    errors.assignedTo = "Select who this task is assigned to";
  }

  return errors;
}

export const AddTask: React.FC = () => {
  const {
    data: employeesData,
    isLoading: employeesLoading,
    isError: employeesError,
    refetch: refetchEmployees,
  } = useGetEmployeesDetails();

  const {
    data: projectsData,
    isLoading: projectsLoading,
    isError: projectsError,
    refetch: refetchProjects,
  } = useGetProjectsDetails();

  const { mutate, isPending, isError, isSuccess, error } = useAddTask();

  const [values, setValues] = useState<TaskData>({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    projectId: "",
    assignedTo: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const employees = employeesData?.employees ?? [];
  const projects = projectsData?.projects ?? [];

  const employeeOptions: SelectOption[] = useMemo(
    () =>
      employees.map((employee) => ({
        value: employee.userId,
        label: `${employee.fullName} — ${employee.isActive ? "Active" : "Inactive"}`,
      })),
    [employees],
  );

  const projectOptions: SelectOption[] = useMemo(
    () =>
      projects.map((project) => ({ value: project.id, label: project.name })),
    [projects],
  );

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange =
    (field: keyof TaskData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleBlur = (field: keyof TaskData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      title: true,
      description: true,
      priority: true,
      dueDate: true,
      projectId: true,
      assignedTo: true,
    });

    if (!isValid) return;

    mutate(values);
  };

  return (
    <div className="addTaskPage">
      <div className="addTaskHeader">
        <h1 className="addTaskTitle">Add task</h1>
        <p className="addTaskSubtitle">
          Create a task and assign it to a project and a team member.
        </p>
      </div>

      <form className="addTaskCard" onSubmit={handleSubmit} noValidate>
        {isError && (
          <div className="addTaskError">
            {error instanceof Error
              ? error.message
              : "Something went wrong. Try again."}
          </div>
        )}

        {isSuccess && (
          <div className="addTaskSuccess">Task created successfully.</div>
        )}

        <div className="addTaskGrid">
          <Input
            label="Title"
            type="text"
            value={values.title}
            onChange={handleChange("title")}
            onBlur={handleBlur("title")}
            error={touched.title ? errors.title : undefined}
            placeholder="Write launch announcement"
          />

          <Input
            label="Due date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={values.dueDate}
            onChange={handleChange("dueDate")}
            onBlur={handleBlur("dueDate")}
            error={touched.dueDate ? errors.dueDate : undefined}
          />
        </div>

        <div className="addTaskGrid">
          <Select
            label="Priority"
            options={PRIORITY_OPTIONS}
            placeholder="Select priority"
            value={values.priority}
            onChange={handleChange("priority")}
            onBlur={handleBlur("priority")}
            error={touched.priority ? errors.priority : undefined}
          />

          {projectsLoading ? (
            <div className="addTaskInlineLoader">
              <Loader2
                size={14}
                className="addTaskInlineSpinner"
                aria-hidden="true"
              />
              Loading projects...
            </div>
          ) : projectsError ? (
            <p className="addTaskInlineError">
              Couldn't load projects.
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => refetchProjects()}
              >
                Retry
              </Button>
            </p>
          ) : (
            <Select
              label="Project"
              options={projectOptions}
              placeholder="Select a project"
              value={values.projectId}
              onChange={handleChange("projectId")}
              onBlur={handleBlur("projectId")}
              error={touched.projectId ? errors.projectId : undefined}
              disabled={projectOptions.length === 0}
            />
          )}
        </div>

        <div className="addTaskGrid">
          {employeesLoading ? (
            <div className="addTaskInlineLoader">
              <Loader2
                size={14}
                className="addTaskInlineSpinner"
                aria-hidden="true"
              />
              Loading team members...
            </div>
          ) : employeesError ? (
            <p className="addTaskInlineError">
              Couldn't load team members.
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => refetchEmployees()}
              >
                Retry
              </Button>
            </p>
          ) : (
            <Select
              label="Assigned to"
              options={employeeOptions}
              placeholder="Select a team member"
              value={values.assignedTo}
              onChange={handleChange("assignedTo")}
              onBlur={handleBlur("assignedTo")}
              error={touched.assignedTo ? errors.assignedTo : undefined}
              disabled={employeeOptions.length === 0}
            />
          )}
        </div>

        <div className="addTaskGrid">
          <div className="addTaskFieldFull">
            <label className="addTaskTextareaLabel" htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              className={`addTaskTextarea ${
                touched.description && errors.description
                  ? "addTaskTextareaError"
                  : ""
              }`}
              value={values.description}
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              placeholder="What does this task involve?"
              rows={4}
            />
            {touched.description && errors.description && (
              <span className="addTaskTextareaHelper">
                {errors.description}
              </span>
            )}
          </div>
        </div>

        <div className="addTaskActions">
          <Button
            type="submit"
            isLoading={isPending}
            disabled={!isValid || employeesLoading || projectsLoading}
          >
            Create task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
