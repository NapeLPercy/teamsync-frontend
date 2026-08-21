import React, { useMemo } from "react";
import "../../styles/TaskCommentsHeader.css";

interface TaskSummary {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface Comment {
  id: string;
  content: string;
  fullName: string;
  createdAt: string;
  role: string;
}

const PRIORITY_CLASS: Record<string, string> = {
  LOW: "tchPrioritySuccess",
  MEDIUM: "tchPriorityWarning",
  HIGH: "tchPriorityError",
};

interface TaskCommentsHeaderProps {
  task: TaskSummary;
  comments: Comment[];
}

export const TaskCommentsHeader: React.FC<TaskCommentsHeaderProps> = ({ task, comments }) => {
  const stats = useMemo(() => {
    const byAdmin = comments.filter((c) => c.role?.toUpperCase() === "ADMIN").length;
    const byEmployee = comments.filter((c) => c.role?.toUpperCase() === "EMPLOYEE").length;
    return { total: comments.length, byAdmin, byEmployee };
  }, [comments]);

  return (
    <div className="tchHeader">
      <div className="tchInfo">
        <div className="tchTop">
          <span className={`tchPriority ${PRIORITY_CLASS[task.priority] ?? ""}`}>
            {task.priority}
          </span>
          <span className="tchStatus">{task.status}</span>
        </div>
        <h1 className="tchTitle">{task.title}</h1>
        <p className="tchDescription">{task.description}</p>
        <span className="tchDue">Due {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>

      <div className="tchStats">
        <div className="tchStatItem">
          <span className="tchStatValue">{stats.total}</span>
          <span className="tchStatLabel">Total</span>
        </div>
        <div className="tchStatItem">
          <span className="tchStatValue">{stats.byAdmin}</span>
          <span className="tchStatLabel">By admin</span>
        </div>
        <div className="tchStatItem">
          <span className="tchStatValue">{stats.byEmployee}</span>
          <span className="tchStatLabel">By employees</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCommentsHeader;