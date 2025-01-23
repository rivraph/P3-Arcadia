import { Navigate, Outlet } from "react-router-dom";

function Users() {
  const isUsers = localStorage.getItem("isUsers") === "true";

  return isUsers ? <Outlet /> : <Navigate to="/register" replace />;
}

export default Users;
