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
    location.pathname === "/homepage" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const toggleMenu = () => {
    if (isMenuOpen === false) {
      setIsMenuOpen(true);
    }
    if (isMenuOpen === true) {
      setIsMenuOpen(false);
    }
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    console.info(target.textContent);
    if (localStorage.getItem("isUsers") === "true") {
      if (target.textContent === "Games list") {
        navigate("/users/gamelist");
      }
      if (target.textContent === "My Profile") {
        navigate("/users/profil");
      }
      if (target.textContent === "Scores History") {
        navigate("/users/scoreshistory");
      }
      if (target.textContent === "Rewards") {
        navigate("/users/rewards");
      }
      if (target.textContent === "Rewards History") {
        navigate("/users/rewardshistory");
      }
      if (target.textContent === "Contact us") {
        navigate("/users/contact");
      }
      if (target.textContent === "Arcadia PlayStore") {
        navigate("/users/about");
      }
      if (target.textContent === "Disconnect") {
        localStorage.setItem("isUsers", "false");
        navigate("/homepage");
      }
    }
    if (localStorage.getItem("isAdmin") === "true") {
      if (target.textContent === "Games list") {
        navigate("/admin/admingamelist");
      }
      if (target.textContent === "My Profile") {
        navigate("/admin/adminprofil");
      }
      if (target.textContent === "Scores History") {
        navigate("/admin/adminscoreshistory");
      }
      if (target.textContent === "Rewards") {
        navigate("/admin/adminrewards");
      }
      if (target.textContent === "Rewards History") {
        navigate("/admin/adminrewardshistory");
      }
      if (target.textContent === "Contact us") {
        navigate("/admin/admincontact");
      }
      if (target.textContent === "Arcadia PlayStore") {
        navigate("/admin/adminabout");
      }
      if (target.textContent === "Disconnect") {
        localStorage.setItem("isUsers", "false");
        navigate("/homepage");
      }
    }
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
            onClick={handleMenuClick}
            onKeyUp={handleKeyPress}
          >
            Games list
          </li>
          <li
            className="limenu"
            onClick={handleMenuClick}
            onKeyUp={handleKeyPress}
          >
            My Profile
          </li>
          <li
            className="limenu"
            onClick={handleMenuClick}
            onKeyUp={handleKeyPress}
          >
            Scores History
          </li>
          <li
            className="limenu"
            onClick={handleMenuClick}
            onKeyUp={handleKeyPress}
          >
            Rewards
          </li>
          <li
            className="limenu"
            onClick={handleMenuClick}
            onKeyUp={handleKeyPress}
          >
            Rewards History
          </li>
          <li
            className="limenu"
            onClick={handleMenuClick}
            onKeyUp={handleKeyPress}
          >
            Contact us
          </li>
          <li
            className="limenu"
            onClick={handleMenuClick}
            onKeyUp={handleKeyPress}
          >
            Arcadia PlayStore
          </li>
          <li
            className="limenu"
            onClick={handleMenuClick}
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
