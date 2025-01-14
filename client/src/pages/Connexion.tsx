import "../styles/Connexion.css";
import { useNavigate } from "react-router-dom";

function Connexion() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate("/GameList");
    }
  };

  return (
    <>
      <div className="mainconnexion">
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <input
            type="submit"
            value="Submit"
            onClick={() => handleClick("/GameList")}
            onKeyUp={handleKeyPress}
          />
        </form>
      </div>
    </>
  );
}

export default Connexion;
