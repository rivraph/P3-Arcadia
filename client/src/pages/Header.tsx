import "../styles/Header.css";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Connexion from "./Connexion";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/Register";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  console.info(isMenuOpen);

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleMenu();
    }
  };

  return (
    <div className="header">
      <div className="menucontener">
        {!isHomePage && (
          <button type="button" className="menubutton" onClick={toggleMenu}>
            MENU
          </button>
        )}
        <ul
          className="list-group"
          ref={menuRef}
          style={{ display: isMenuOpen ? "block" : "none" }}
        >
          <li
            className="limenu"
            onClick={() => handleMenuClick("/MainGame")}
            onKeyUp={handleKeyPress}
          >
            Profil
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("/MainGame")}
            onKeyUp={handleKeyPress}
          >
            History
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("/Rewards")}
            onKeyUp={handleKeyPress}
          >
            Shop
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("/MainGame")}
            onKeyUp={handleKeyPress}
          >
            Contact
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("/about")}
            onKeyUp={handleKeyPress}
          >
            Game Center
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("/")}
            onKeyUp={handleKeyPress}
          >
            Disconnect
          </li>
        </ul>
      </div>
      <img src="/assets/logo.png" alt="logo du site" />
      <div className="headerconnexion">
        <Connexion />
      </div>
    </div>
  );
}

export default Header;
