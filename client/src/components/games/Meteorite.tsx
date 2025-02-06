import { useEffect, useRef, useState } from "react";
import { useContextProvider } from "../context/ArcadiaContext";
import "./Meteorite.css";

const Meteorite = () => {
  const canvasWidth = 1280;
  const canvasHeight = 720;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameLoopRef = useRef<(() => void) | null>(null);
  const [basketX, setBasketX] = useState(canvasWidth / 2 - 50);
  const [fallingObjects, setFallingObjects] = useState<
    { x: number; y: number }[]
  >([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(4);

  const { userScores, setUserScores } = useContextProvider();
  const [userGameScore, setUserGameScore] = useState<number>(0);

  const spawnRate = 1000 / 60; // Temps en ms entre chaque spawn d'objet (modifiable)
  const maxObjects = 3; // Nombre max d'objets en même temps (modifiable)

  const startGame = () => {
    setGameStarted(true);
    setUserGameScore(0);
    setCurrentSpeed(4);
  };

  const restartGame = () => {
    setUserScores((prevScore) => prevScore + userGameScore);
    setFallingObjects([]);
    setGameOver(false);
    setCurrentSpeed(4);
    setUserGameScore(0);
    setGameStarted(false);
    if (gameLoopRef.current) {
      requestAnimationFrame(gameLoopRef.current);
    }
  };

  console.info(userScores);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationFrameId: number;
    const basketWidth = 100;
    const basketHeight = 20;
    const objectSize = 20;

    // Redessiner le fond d'écran avec le gradient bleu
    const drawBackground = (ctx: CanvasRenderingContext2D) => {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvasWidth,
        canvasHeight,
      );
      gradient.addColorStop(0, "#000428");
      gradient.addColorStop(1, "#004e92");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    // Fonction pour dessiner les objets qui tombent
    const drawFallingObject = (
      ctx: CanvasRenderingContext2D,
      obj: { x: number; y: number },
    ) => {
      const gradient = ctx.createLinearGradient(
        obj.x,
        obj.y,
        obj.x + objectSize,
        obj.y + objectSize,
      );
      gradient.addColorStop(0, "red");
      gradient.addColorStop(1, "orange");
      ctx.fillStyle = gradient;
      ctx.fillRect(obj.x, obj.y, objectSize, objectSize);
    };

    // Fonction pour dessiner le panier (joueur)
    const drawBasket = (ctx: CanvasRenderingContext2D) => {
      const gradient = ctx.createLinearGradient(
        basketX,
        canvasHeight - basketHeight,
        basketX + basketWidth,
        canvasHeight,
      );
      gradient.addColorStop(0, "blue");
      gradient.addColorStop(1, "lightblue");
      ctx.fillStyle = gradient;
      ctx.fillRect(
        basketX,
        canvasHeight - basketHeight,
        basketWidth,
        basketHeight,
      );
    };

    // Fonction qui vérifie si un objet touche le panier
    const checkCollision = (objectX: number, objectY: number) => {
      return (
        objectY + objectSize >= canvasHeight - basketHeight &&
        objectX >= basketX &&
        objectX <= basketX + basketWidth
      );
    };

    // Fonction qui génère un nouvel objet si la limite n'est pas atteinte
    const spawnObject = () => {
      setFallingObjects((prev) => {
        if (prev.length < maxObjects) {
          return [
            ...prev,
            { x: Math.random() * (canvasWidth - objectSize), y: 20 },
          ];
        }
        return prev; // On ne génère pas d'objet si la limite est atteinte
      });
    };

    // Boucle de jeu
    const gameLoop = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBackground(ctx);
      drawBasket(ctx);

      setFallingObjects((prev) => {
        const updatedObjects = prev
          .map((obj) => ({ x: obj.x, y: obj.y + currentSpeed }))
          .filter((obj) => {
            if (checkCollision(obj.x, obj.y)) {
              setUserGameScore((prevScore) => {
                const newScore = prevScore + 1;
                if (newScore % 50 === 0) {
                  setCurrentSpeed((prevSpeed) => prevSpeed + 2);
                }
                return newScore;
              });
              return false;
            }
            return obj.y <= canvasHeight; // Supprime les objets hors de l'écran
          });

        return updatedObjects;
      });

      // Dessiner les objets
      for (const obj of fallingObjects) {
        drawFallingObject(ctx, obj);
      }

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoopRef.current = gameLoop;
    animationFrameId = requestAnimationFrame(gameLoop);
    const intervalId = setInterval(spawnObject, spawnRate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, [basketX, fallingObjects, gameOver, currentSpeed, gameStarted]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setBasketX((prev) => Math.max(prev - 70, 0));
    } else if (e.key === "ArrowRight") {
      setBasketX((prev) => Math.min(prev + 70, canvasWidth - 100));
    }
    if (e.key === " ") {
      setGameOver(true);
      return false;
    }
  };

  return (
    <div
      className="meteoriteclass"
      onKeyDown={handleKeyDown}
      style={{ outline: "none" }}
    >
      <p>Score {userGameScore}</p>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black" }}
      />
      {!gameStarted ? (
        <button type="button" onClick={startGame}>
          Start
        </button>
      ) : (
        <button type="button" onClick={restartGame}>
          Restart
        </button>
      )}
    </div>
  );
};

export default Meteorite;
