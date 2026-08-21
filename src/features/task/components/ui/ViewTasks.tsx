import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/input/Input";
import Select from "../../../../components/ui/select/Select";
import "../../styles/ViewTasks.css";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
}

interface ViewTasksProps {
  headerText: string;
  subText: string;
  tasks: Task[];
  user: "ADMIN" | "EMPLOYEE";
  onDelete?: (id: string) => void;
}

const ALL = "All";

const PRIORITY_CLASS: Record<string, string> = {
  LOW: "vtPrioritySuccess",
  MEDIUM: "vtPriorityWarning",
  HIGH: "vtPriorityError",
};

export const ViewTasks: React.FC<ViewTasksProps> = ({
  headerText,
  subText,
  tasks,
  user,
  onDelete,
}) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [priorityFilter, setPriorityFilter] = useState(ALL);

  const statusOptions = useMemo(
    () => [ALL, ...Array.from(new Set(tasks.map((t) => t.status)))],
    [tasks],
  );

  const priorityOptions = useMemo(
    () => [ALL, ...Array.from(new Set(tasks.map((t) => t.priority)))],
    [tasks],
  );

  const visibleTasks = useMemo(() => {
    const term = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch = !term || task.title.toLowerCase().includes(term);
      const matchesStatus =
        statusFilter === ALL || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === ALL || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, search, statusFilter, priorityFilter]);

  const handleViewComments = (task) => {
    navigate(`/dashboard/tasks/${task.id}/comments`, {
      state: { task },
    });
  };
  return (
    <div className="viewTasksPage">
      <div className="vtHeader">
        <h1 className="vtTitle">{headerText}</h1>
        <p className="vtSubtitle">{subText}</p>
      </div>

      <div className="vtToolbar">
        <div className="vtSearch">
          <Input
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="vtFilters">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="vtGrid">
        {visibleTasks.map((task) => (
          <div className="vtCard" key={task.id}>
            <div className="vtCardTop">
              <span
                className={`vtPriority ${PRIORITY_CLASS[task.priority] ?? ""}`}
              >
                {task.priority}
              </span>
              <span className="vtStatus">{task.status}</span>
            </div>

            <h3 className="vtName">{task.title}</h3>
            <p className="vtDescription">{task.description}</p>

            <div className="vtMeta">
              <span className="vtMetaItem">
                <span className="vtMetaLabel">Created</span>
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
              <span className="vtMetaItem">
                <span className="vtMetaLabel">Due</span>
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>

            <div className="vtActions">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                View more
              </Button>
              {user === "ADMIN" && (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete?.(task.id)}
                >
                  Delete
                </Button>
              )}

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleViewComments(task)}
              >
                Comments
              </Button>
            </div>
          </div>
        ))}

        {visibleTasks.length === 0 && (
          <div className="vtNoResults">
            <Search size={18} />
            <span>No tasks match your search or filters.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTasks;
