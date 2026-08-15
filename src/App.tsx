import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DashboardLayout from "./features/dashboard/components/DashboardLayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Register />} />

      {/*DASHBOARD */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>
      
    </Routes>
  );
}

export default App;
