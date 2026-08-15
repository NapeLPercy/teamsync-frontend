import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Folder,
  CheckSquare,
  Briefcase,
  BarChart3,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  X,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { sidebarItems, type SidebarRole } from "../../../data/sidebarData";

const ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  users: Users,
  folder: Folder,
  "check-square": CheckSquare,
  briefcase: Briefcase,
  "bar-chart": BarChart3,
  settings: Settings,
};

const VALID_ROLES: SidebarRole[] = ["ADMIN", "EMPLOYEE"];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Always confirm the role against the known sidebar keys before rendering
  // anything — an unrecognized or missing role renders no nav items.
  const role = user?.role as SidebarRole | undefined;
  const hasValidRole = isAuthenticated && !!role && VALID_ROLES.includes(role);
  const items = hasValidRole ? sidebarItems[role as SidebarRole] : [];

  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  // Auto-expand whichever group contains the currently active route.
  useEffect(() => {
    const activeParent = items.find((item) =>
      item.children?.some((child) => location.pathname.startsWith(child.path)),
    );
    if (activeParent) {
      setExpandedPaths((prev) => new Set(prev).add(activeParent.path));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleExpanded = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="sidebarBackdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isCollapsed ? "sidebarCollapsed" : ""} ${
          isMobileOpen ? "sidebarMobileOpen" : ""
        }`}
      >
        <div className="sidebarBrand">
          <span className="sidebarBrandMark" />
          {!isCollapsed && <span className="sidebarBrandText">teamsyc</span>}
          <button
            type="button"
            className="sidebarMobileClose"
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sidebarNav">
          {items.map((item) => {
            const Icon = ICONS[item.icon];
            const hasChildren = !!item.children?.length;
            const isExpanded = expandedPaths.has(item.path);
            const isChildActive = !!item.children?.some((child) =>
              location.pathname.startsWith(child.path),
            );

            if (!hasChildren) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `sidebarNavItem ${isActive ? "sidebarNavItemActive" : ""}`
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="sidebarNavIcon">
                    {Icon && <Icon size={18} />}
                  </span>
                  {!isCollapsed && (
                    <span className="sidebarNavLabel">{item.label}</span>
                  )}
                </NavLink>
              );
            }

            return (
              <div className="sidebarNavGroup" key={item.path}>
                <button
                  type="button"
                  className={`sidebarNavItem sidebarNavGroupHeader ${
                    isChildActive ? "sidebarNavItemActive" : ""
                  }`}
                  onClick={() => toggleExpanded(item.path)}
                  title={isCollapsed ? item.label : undefined}
                  aria-expanded={isExpanded}
                >
                  <span className="sidebarNavIcon">
                    {Icon && <Icon size={18} />}
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="sidebarNavLabel">{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`sidebarNavChevron ${
                          isExpanded ? "sidebarNavChevronOpen" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                {!isCollapsed && isExpanded && (
                  <div className="sidebarNavChildren">
                    {item.children!.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        end
                        onClick={onCloseMobile}
                        className={({ isActive }) =>
                          `sidebarNavChildItem ${isActive ? "sidebarNavChildItemActive" : ""}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className="sidebarCollapseToggle"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronsRight size={16} />
          ) : (
            <ChevronsLeft size={16} />
          )}
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
