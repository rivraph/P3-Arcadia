import { useNavigate } from "react-router-dom";
import "../styles/MainGame.css";
import { useEffect, useState } from "react";
import Meteorite from "../components/games/Meteorite";
import ShootAlien from "../components/games/ShootAlien";
import Walking from "../components/games/WalkingHell";

function MainGame() {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState<string | undefined | null>(null);

  useEffect(() => {
    const gName = localStorage.getItem("gamename");
    console.info("nom du jeu sélectionné :", gName);
    setGameName(gName);
  }, []);

  const gameNumber = localStorage.getItem("gamenumber");
  console.info("id de jeu sélectionné :", gameNumber);

  const handleclickBack = () => {
    if (localStorage.getItem("role") === "user") {
      localStorage.setItem("gamenumber", "");
      setGameName("");
      navigate("/users/gamelist");
    }
    if (localStorage.getItem("role") === "boss") {
      localStorage.setItem("gamenumber", "");
      setGameName("");
      navigate("/admin/gamelist");
    }
  };

  const handleKeyDown = () => {
    if (localStorage.getItem("role") === "user") {
      localStorage.setItem("gamenumber", "");
      setGameName("");
      navigate("/users/gamelist");
    }
    if (localStorage.getItem("role") === "boss") {
      localStorage.setItem("gamenumber", "");
      setGameName("");
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
            onClick={handleclickBack}
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
          ) : gameName === "Shoot Alien" ? (
            <ShootAlien />
          ) : (
            <p>Loading error</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MainGame;
