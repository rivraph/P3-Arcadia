import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Gamelist.css";

type Game = {
  id: string;
  game_name: string;
};

const GameList = () => {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");
  const [gameId, setGameId] = useState("");
  localStorage.setItem("gamenumber", "");
  localStorage.setItem("gamename", "");

  const handlePlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const gameCard =
      (event.target as HTMLElement).closest(".gamelist-main") || null;

    console.info(gameCard);

    const gameId = gameCard?.querySelector("img")?.alt || "";
    const gameName = gameCard?.querySelector("h2")?.innerText || "";
    setGameName(gameName);
    setGameId(gameId);
    console.info(gameId);
    console.info(gameName);

    if (localStorage.getItem("role") === "user") {
      localStorage.setItem("gamenumber", gameId);
      localStorage.setItem("gamename", gameName);
      navigate("/users/maingame");
    }
    if (localStorage.getItem("role") === "boss") {
      localStorage.setItem("gamenumber", gameId);
      localStorage.setItem("gamename", gameName);
      navigate("/admin/maingame");
    }
  };

  const handleKeyUp = () => {
    if (localStorage.getItem("role") === "user") {
      localStorage.setItem("gamenumber", gameId);
      localStorage.setItem("gamename", gameName);
      navigate("/users/maingame");
    }
    if (localStorage.getItem("role") === "boss") {
      localStorage.setItem("gamenumber", gameId);
      localStorage.setItem("gamename", gameName);
      navigate("/admin/maingame");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/games`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (response.ok) {
          const gamesData = await response.json();
          setGamesData(gamesData);
          console.info("Données retour du backend :", gamesData);
        }
      } catch (err) {
        window.alert("erreur de lecture des jeux");
        console.error("Erreur lors de la connexion :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className="gamelist-main"
      onClick={handlePlayClick}
      onKeyUp={handleKeyUp}
    >
      {gamesData.map((g) => (
        <div className="game-list" key={g.id}>
          <button type="button" className="game-card">
            <h2>{g.game_name}</h2>
            <img src="../assets/arcadiagamescreen.png" alt={g.id} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default GameList;
