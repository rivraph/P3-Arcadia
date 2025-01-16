import { useState } from "react";
import "../styles/Gamelist.css";

const GameList = () => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const handlePlayClick = (imageSrc: string) => {
    setFullscreenImage(imageSrc);
  };

  const handleCloseClick = () => {
    setFullscreenImage(null);
  };

  const handleKeyUp = <T extends HTMLElement>(
    event: React.KeyboardEvent<T>,
    imageSrc?: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setFullscreenImage(imageSrc || null);
    }
  };

  return (
    <div className="gamelist-main">
      {fullscreenImage && (
        <button
          type="button"
          className="fullscreen-overlay"
          onClick={handleCloseClick}
          onKeyUp={(event) => handleKeyUp(event)}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="fullscreen-image"
          />
        </button>
      )}
      <div className="game-list">
        <button
          type="button"
          className="game-card"
          onClick={() => handlePlayClick("../assets/arcadiagamescreen.png")}
          onKeyUp={(event) =>
            handleKeyUp(event, "../assets/arcadiagamescreen.png")
          }
        >
          <h2>Jeu 1</h2>
          <img src="../assets/arcadiagamescreen.png" alt="" />
        </button>

        <button
          type="button"
          className="game-card"
          onClick={() => handlePlayClick("../assets/arcadiagamescreen.png")}
          onKeyUp={(event) =>
            handleKeyUp(event, "../assets/arcadiagamescreen.png")
          }
        >
          <h2>Jeu 2</h2>
          <img src="../assets/arcadiagamescreen.png" alt="" />
        </button>

        <button
          type="button"
          className="game-card"
          onClick={() => handlePlayClick("../assets/arcadiagamescreen.png")}
          onKeyUp={(event) =>
            handleKeyUp(event, "../assets/arcadiagamescreen.png")
          }
        >
          <h2>Jeu 3</h2>
          <img src="../assets/arcadiagamescreen.png" alt="" />
        </button>

        <button
          type="button"
          className="game-card"
          onClick={() => handlePlayClick("../assets/arcadiagamescreen.png")}
          onKeyUp={(event) =>
            handleKeyUp(event, "../assets/arcadiagamescreen.png")
          }
        >
          <h2>Jeu 4</h2>
          <img src="../assets/arcadiagamescreen.png" alt="" />
        </button>

        <button
          className="game-card"
          type="button"
          onClick={() => handlePlayClick("../assets/arcadiagamescreen.png")}
          onKeyUp={(event) =>
            handleKeyUp(event, "../assets/arcadiagamescreen.png")
          }
        >
          <h2>Jeu 5</h2>
          <img src="../assets/arcadiagamescreen.png" alt="" />
        </button>

        <button
          type="button"
          className="game-card"
          onClick={() => handlePlayClick("../assets/arcadiagamescreen.png")}
          onKeyUp={(event) =>
            handleKeyUp(event, "../assets/arcadiagamescreen.png")
          }
        >
          <h2>Jeu 6</h2>
          <img src="../assets/arcadiagamescreen.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default GameList;
