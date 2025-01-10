import "../styles/Header.css";
import Connexion from "./Connexion";

function Header() {
  return (
    <>
      <div className="header">
        <img src="/assets/logo.png" alt="logo du site" />
        <div className="headerconnexion">
          <Connexion />
        </div>
      </div>
    </>
  );
}

export default Header;
