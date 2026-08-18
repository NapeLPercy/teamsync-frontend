import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/button/Button";
import "../../styles/ViewProjects.css";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  dueDate: string;
}

interface ViewProjectsProps {
  headerText: string;
  subText?: string;
  projects: Project[];
  role: "ADMIN" | "EMPLOYEE";
  onDelete?: (id: string) => void;
}

export const ViewProjects: React.FC<ViewProjectsProps> = ({
  headerText,
  subText,
  projects,
  role,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleViewMore = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;
    onDelete?.(id);
  };

  return (
    <div className="viewProjectsPage">
      <div className="vpHeader">
        <h1 className="vpTitle">{headerText}</h1>
        {subText && <p className="vpSubtitle">{subText}</p>}
      </div>

      <div className="vpGrid">
        {projects.map((project) => (
          <div className="vpCard" key={project.id}>
            <div className="vpCardTop">
              <span className="vpCategoryBadge">{project.category}</span>
            </div>

            <h3 className="vpCardTitle">{project.name}</h3>
            <p className="vpCardDescription">{project.description}</p>

            <div className="vpCardDates">
              <span>
                Created <strong>{new Date(project.createdAt).toLocaleDateString()}</strong>
              </span>
              <span>
                Due <strong>{new Date(project.dueDate).toLocaleDateString()}</strong>
              </span>
            </div>

            <div className="vpCardActions">
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="primary"
                onClick={() => handleViewMore(project.id)}
              >
                View more
              </Button>

              {role === "ADMIN" && (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProjects;