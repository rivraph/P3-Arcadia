import { useEffect } from "react";
import "../styles/Connexion.css";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const navigate = useNavigate();

  const handleClick = () => {
    // il faudra intégrer la logique de la recherche du role à travers la BDD)
    if (
      localStorage.getItem("role") === "admin" &&
      localStorage.getItem("isAdmin") === "false"
    ) {
      localStorage.setItem("isAdmin", "true");
      window.alert("login to administrator");
      navigate("/admin/admingamelist");
    }
    if (
      localStorage.getItem("role") === "user" &&
      localStorage.getItem("isUsers") === "false"
    ) {
      localStorage.setItem("isUsers", "true");
      window.alert("login to user");
      navigate("/users/gamelist");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("admin/admingamelist");
    }
    if (localStorage.getItem("isUsers") === "true") {
      navigate("users/gamelist");
    }
  }, [navigate]);

  return (
    <>
      <div className="mainconnexion">
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="button" onClick={handleClick}>
            sign up
          </button>
        </form>
      </div>
    </>
  );
}

export default Connexion;
