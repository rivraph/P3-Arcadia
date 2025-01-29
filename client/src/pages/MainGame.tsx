import { useNavigate } from "react-router-dom";
import "../styles/MainGame.css";
import { useState } from "react";
import Meteorite from "../components/games/Meteorite";
import Walking from "../components/games/WalkingHell";

function MainGame() {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState<string | undefined | null>(null);
  const gameNumber = localStorage.getItem("gamenumber");
  const gName = localStorage.getItem("gamename");
  console.info(gName);
  setGameName(gName);
  console.info("id de jeu sélectionné :", gameNumber);

  const handleclick = () => {
    if (localStorage.getItem("role") === "user") {
      localStorage.setItem("gamenumber", "");
      navigate("/users/gamelist");
    }
    if (localStorage.getItem("role") === "boss") {
      localStorage.setItem("gamenumber", "");
      navigate("/admin/gamelist");
    }
  };

  const handleKeyDown = () => {
    if (localStorage.getItem("role") === "user") {
      localStorage.setItem("gamenumber", "");
      navigate("/users/gamelist");
    }
    if (localStorage.getItem("role") === "boss") {
      localStorage.setItem("gamenumber", "");
      navigate("/admin/gamelist");
    }
  };

  return (
    <>
      <div className="mainGameContener">
        <img src="../assets/arcadiagamescreen.png" alt={gameName ?? ""} />
        <div id="divbutton">
          <button
            id="button"
            type="button"
            onClick={handleclick}
            onKeyDown={handleKeyDown}
          >
            {" "}
            BACK{" "}
          </button>
        </div>
        <div className="gamedisplay">
          {gameName === "Walking Hell" ? (
            <Walking />
          ) : gameName === "Meteorite" ? (
            <Meteorite />
          ) : (
            <p>Loading error</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MainGame;
