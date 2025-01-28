import { Navigate, Outlet } from "react-router-dom";

const Users: React.FC = () => {
  const role = localStorage.getItem("role"); // Récupération du rôle depuis le localStorage

  if (role !== "user") {
    // Si l'utilisateur n'a pas le rôle "boss", il est redirigé vers la page d'accueil
    return <Navigate to="/homepage" replace />;
  }

  // Sinon, on autorise l'accès aux enfants (routes imbriquées)
  return <Outlet />;
};

export default Users;
