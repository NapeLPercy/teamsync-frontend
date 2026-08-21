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
    | "settings"
    | "messages-square";
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
        { label: "Add Employee", path: "/dashboard/employees/add" },
        { label: "View Employees", path: "/dashboard/employees/manage" },
      ],
    },
    {
      label: "Projects",
      path: "/projects",
      icon: "folder",
      children: [
        { label: "Add Project", path: "/dashboard/projects/add" },
        { label: "View All Projects", path: "/dashboard/projects/all" },
        { label: "Projects by me", path: "/dashboard/projects/assigned_by_me" },
      ],
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: "check-square",
      children: [
        { label: "Add Task", path: "/dashboard/tasks/add" },
        { label: "View Tasks", path: "/dashboard/tasks/all" },
        { label: "Tasks by me", path: "/dashboard/tasks/assigned_by_me" },
      ],
    },
    // {
    //   label: "Comments",
    //   path: "/comments",
    //   icon: "messages-square",
    //   children: [
    //     { label: "Add Client", path: "/clients/add" },
    //     { label: "View Comment", path: "/comments/" },
    //   ],
    // },
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
