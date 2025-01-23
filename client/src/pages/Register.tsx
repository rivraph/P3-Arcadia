import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      localStorage.getItem("role") === "admin" &&
      localStorage.getItem("isAdmin") === "false"
    ) {
      localStorage.setItem("isAdmin", "true");
      window.alert("Register like administrator");
      navigate("/admin/admingamelist");
    }
    if (
      localStorage.getItem("role") === "user" &&
      localStorage.getItem("isUsers") === "false"
    ) {
      localStorage.setItem("isUsers", "true");
      window.alert("Register like user");
      navigate("/users/gamelist");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("users/gamelist");
    }
  }, [navigate]);

  return (
    <div className="mainregistercontener">
      <div className="main-register">
        <h1>REGISTER</h1>
        <form className="labelgroup">
          <label htmlFor="username">Firstname:</label>
          <input type="text" id="firstname" name="firstname" />

          <label htmlFor="password">Lastname:</label>
          <input type="text" id="lastname" name="lastname" />

          <label htmlFor="password">Email:</label>
          <input type="text" id="email" name="email" />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />

          <button
            type="button"
            className="button-link-register"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
