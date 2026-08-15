export interface SidebarSubItem {
  label: string;
  path: string;
}

export interface SidebarItem {
  label: string;
  path: string;
  icon:
    | "dashboard"
    | "users"
    | "folder"
    | "check-square"
    | "briefcase"
    | "bar-chart"
    | "settings";
  children?: SidebarSubItem[];
}

export type SidebarRole = "ADMIN" | "EMPLOYEE";

export const sidebarItems: Record<SidebarRole, SidebarItem[]> = {
  ADMIN: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "dashboard",
    },
    {
      label: "Employees",
      path: "/employees",
      icon: "users",
      children: [
        { label: "Add Employee", path: "/employees/add" },
        { label: "View Employees", path: "/employees" },
      ],
    },
    {
      label: "Projects",
      path: "/projects",
      icon: "folder",
      children: [
        { label: "Add Project", path: "/projects/add" },
        { label: "View Projects", path: "/projects" },
      ],
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: "check-square",
      children: [
        { label: "Add Task", path: "/tasks/add" },
        { label: "View Tasks", path: "/tasks" },
      ],
    },
    {
      label: "Clients",
      path: "/clients",
      icon: "briefcase",
      children: [
        { label: "Add Client", path: "/clients/add" },
        { label: "View Clients", path: "/clients" },
      ],
    },
    {
      label: "Reports",
      path: "/reports",
      icon: "bar-chart",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "settings",
    },
  ],
  EMPLOYEE: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "dashboard",
    },
    {
      label: "My Projects",
      path: "/projects",
      icon: "folder",
    },
    {
      label: "My Tasks",
      path: "/tasks",
      icon: "check-square",
      children: [
        { label: "Add Task", path: "/tasks/add" },
        { label: "View Tasks", path: "/tasks" },
      ],
    },
    {
      label: "Clients",
      path: "/clients",
      icon: "briefcase",
    },
    {
      label: "Settings",
      path: "/settings",
      icon: "settings",
    },
  ],
};

export default sidebarItems;
