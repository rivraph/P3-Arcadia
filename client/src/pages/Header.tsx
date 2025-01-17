import "../styles/Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import Connexion from "./Connexion";

interface headerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: React.RefObject<HTMLDivElement>;
}

function Header({ isMenuOpen, setIsMenuOpen, menuRef }: headerProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage =
    location.pathname === "/" || location.pathname === "/Register";

  const toggleMenu = () => {
    if (isMenuOpen === false) {
      setIsMenuOpen(true);
    }
    if (isMenuOpen === true) {
      setIsMenuOpen(false);
    }
  };

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
    <div className="header" ref={menuRef}>
      <div className="menucontener">
        {!isHomePage && (
          <button type="button" className="menubutton" onClick={toggleMenu}>
            MENU
          </button>
        )}
        <ul
          className="list-group"
          style={{ display: isMenuOpen ? "block" : "none" }}
        >
          <li
            className="limenu"
            onClick={() => handleMenuClick("/gameList")}
            onKeyUp={handleKeyPress}
          >
            Games list
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("/profil")}
            onKeyUp={handleKeyPress}
          >
            My Profile
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("/scoreshistory")}
            onKeyUp={handleKeyPress}
          >
            Scores History
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("rewards")}
            onKeyUp={handleKeyPress}
          >
            Rewards
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("rewardshistory")}
            onKeyUp={handleKeyPress}
          >
            Rewards History
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("contact")}
            onKeyUp={handleKeyPress}
          >
            Contact us
          </li>
          <li
            className="limenu"
            onClick={() => handleMenuClick("about")}
            onKeyUp={handleKeyPress}
          >
            Arcadia PlayStore
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
