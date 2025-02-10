import type React from "react";
import { useState } from "react";
import "../styles/Header.css";
import { useLocation, useNavigate } from "react-router-dom";
import Connexion from "./Connexion";
import Basket from "./basket";

interface headerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuRef: React.RefObject<HTMLDivElement>;
}

function Header({ isMenuOpen, setIsMenuOpen, menuRef }: headerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage =
    location.pathname === "/homepage" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleMenuClick = (
    e: React.MouseEvent<HTMLLIElement> | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    if (e instanceof KeyboardEvent && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
    }

    const target = e.target as HTMLLIElement;
    console.info(target.textContent);
    if (localStorage.getItem("role") === "user") {
      switch (target.textContent) {
        case "Games list":
          navigate("/users/gamelist");
          break;
        case "My Profile":
          navigate("/users/profil");
          break;
        /*  case "Scores History":
          navigate("/users/scoreshistory");
          break; */
        case "Rewards":
          navigate("/users/rewards");
          break;
        /*  case "Rewards History":
          navigate("/users/rewardshistory");
          break; */
        case "Contact us":
          navigate("/users/contact");
          break;
        case "Arcadia PlayStore":
          navigate("/users/about");
          break;
        case "Disconnect":
          navigate("/homepage");
          break;
        default:
          break;
      }
    }
    if (localStorage.getItem("role") === "boss") {
      switch (target.textContent) {
        case "Games list":
          navigate("/admin/gamelist");
          break;
        case "My Profile":
          navigate("/admin/profil");
          break;
        /*  case "Scores History":
          navigate("/admin/scoreshistory");
          break; */
        case "Rewards":
          navigate("/admin/rewards");
          break;
        /* case "Rewards History":
          navigate("/admin/rewardshistory");
          break; */
        case "Contact us":
          navigate("/admin/contact");
          break;
        case "Arcadia PlayStore":
          navigate("/admin/about");
          break;
        case "Disconnect":
          navigate("/homepage");
          break;
        default:
          break;
      }
    }
    setIsMenuOpen(false);
  };

  const handleLoginButtonClick = () => {
    setIsModalOpen(true);
    setIsOverlayVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOverlayVisible(false);
  };

  const idNumber = localStorage.getItem("id");
  const isConnect = Boolean(idNumber);

  return (
    <div className="header" ref={menuRef}>
      <div className="menucontener">
        {!isHomePage && (
          <button type="button" className="menubutton" onClick={toggleMenu}>
            MENU
          </button>
        )}

        <div
          className={`overlay ${isOverlayVisible ? "show" : ""}`}
          onClick={handleCloseModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleCloseModal();
          }}
        />
        <div className={`modal ${isModalOpen ? "show" : ""}`}>
          <Connexion />
          <button type="button" onClick={handleCloseModal}>
            Close
          </button>
        </div>
        <div className="mobilebasket">
          {!isHomePage && isConnect && <Basket />}
        </div>
      </div>
      <img src="/assets/logo.png" alt="logo du site" />
      <div className="headerconnexion">
        {isHomePage && <Connexion />}
        {!isHomePage && isConnect && <Basket />}
      </div>

      <button
        type="button"
        className="login-button"
        onClick={handleLoginButtonClick}
        style={{ display: isHomePage ? "inline-block" : "none" }}
      >
        Login
      </button>

      <ul
        className="list-group"
        style={{ display: isMenuOpen ? "block" : "none" }}
      >
        <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          Games list
        </li>
        <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          My Profile
        </li>
        {/*  <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          Scores History
        </li> */}
        <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          Rewards
        </li>
        {/*  <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          Rewards History
        </li> */}
        <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          Contact us
        </li>
        <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          Arcadia PlayStore
        </li>
        <li
          className="limenu"
          onClick={handleMenuClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleMenuClick(e);
          }}
        >
          Disconnect
        </li>
      </ul>
    </div>
  );
}

export default Header;
