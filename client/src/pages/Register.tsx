import { NavLink } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  return (
    <>
      <div className="main-register">
        <h1>REGISTER</h1>
        <form className="labelgroup">
          <label htmlFor="username">Firstname:</label>
          <input type="text" id="firstname" name="firstname" required />

          <label htmlFor="password">Lastname:</label>
          <input type="text" id="lastname" name="lastname" required />

          <label htmlFor="password">Email:</label>
          <input type="text" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <NavLink to="/Gamelist" className="button-link-register">
            Register
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default Register;
