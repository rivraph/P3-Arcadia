import { Navigate, Outlet } from "react-router-dom";

function Admin() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return isAdmin ? <Outlet /> : <Navigate to="/register" replace />;
}

export default Admin;
