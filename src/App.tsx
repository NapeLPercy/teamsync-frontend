import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./features/dashboard/components/DashboardLayout";
/*EMPLOYEE*/
import AddEmployee from "./features/auth/components/AddEmployee";
import { ViewEmployees } from "./features/admin/components/ViewEmployees";

/**PROJECTS */
import AddProject from "./features/projects/components/Addproject";
import { CompanyProjects } from "./features/projects/components/AllCompanyProjects";
import { CompanyProjectsByMe } from "./features/projects/components/CompanyProjectsByMe";
import AddTask from "./features/task/components/AddTask";

/*tasks */
import CompanyTasks from "./features/task/components/CompanyTasks";
import CompanyTasksByMe from "./features/task/components/CompanyTasksByMe";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />

      {/*DASHBOARD */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* <Route index element={<DashboardHome />} /> */}
        <Route path="employees/add" element={<AddEmployee />} />
        <Route path="employees/manage" element={<ViewEmployees />} />
        <Route path="projects/add" element={<AddProject />} />
        <Route path="projects/all" element={<CompanyProjects />} />
        <Route
          path="projects/assigned_by_me"
          element={<CompanyProjectsByMe />}
        />
        <Route path="tasks/add" element={<AddTask />} />
        <Route path="tasks/all" element={<CompanyTasks />} />
        <Route path="tasks/assigned_by_me" element={<CompanyTasksByMe />} />
      </Route>
    </Routes>
  );
}

export default App;
