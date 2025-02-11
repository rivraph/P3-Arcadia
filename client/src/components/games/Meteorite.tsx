import { useEffect, useRef, useState } from "react";
import { useContextProvider } from "../context/ArcadiaContext";
import "./Meteorite.css";

const Meteorite = () => {
  const canvasWidth = 1280;
  const canvasHeight = 720;
  const gameDuration = 30000; // 30 secondes

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameLoopRef = useRef<(() => void) | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const speedUpTimerRef = useRef<NodeJS.Timeout | null>(null); // Timer pour accélérer la vitesse

  const [basketX, setBasketX] = useState(canvasWidth / 2 - 50);
  const [fallingObjects, setFallingObjects] = useState<
    { x: number; y: number }[]
  >([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(4);
  const [timeLeft, setTimeLeft] = useState(gameDuration / 1000);

  const { userScores, setUserScores } = useContextProvider();
  console.info(userScores);
  const [userGameScore, setUserGameScore] = useState<number>(0);

  const spawnRate = 1000 / 60; // Temps entre chaque spawn d'objet
  const maxObjects = 3; // Nombre max d'objets en même temps

  const startGame = () => {
    setGameStarted(true);
    setUserGameScore(0);
    setCurrentSpeed(4);
    setGameOver(false);
    setTimeLeft(gameDuration / 1000);
    setFallingObjects([]);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Vérification si le timer existe avant de le clear
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setGameOver(true);
        }
        return prev - 1;
      });
    }, 1000);

    // Démarrer le timer pour accélérer la vitesse toutes les 5 secondes
    speedUpTimerRef.current = setInterval(() => {
      setCurrentSpeed((prevSpeed) => prevSpeed + 1); // Accélérer la vitesse des objets
    }, 5000);
  };

  const restartGame = () => {
    setUserScores((prevScore) => prevScore + userGameScore);
    setFallingObjects([]);
    setGameOver(false);
    setGameStarted(false);
    setCurrentSpeed(4);
    setUserGameScore(0);
    setTimeLeft(gameDuration / 1000);

    // Vérification si le timer existe avant de le clear
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Arrêter l'intervalle d'accélération de la vitesse
    if (speedUpTimerRef.current) {
      clearInterval(speedUpTimerRef.current);
    }

    // Lancer une nouvelle boucle de jeu
    if (gameLoopRef.current) {
      requestAnimationFrame(gameLoopRef.current);
    }
  };

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationFrameId: number;
    const basketWidth = 100;
    const basketHeight = 20;
    const objectSize = 20;

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

    const drawFallingObject = (
      ctx: CanvasRenderingContext2D,
      obj: { x: number; y: number },
    ) => {
      ctx.fillStyle = "orange";
      ctx.fillRect(obj.x, obj.y, objectSize, objectSize);
    };

    const drawBasket = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "blue";
      ctx.fillRect(
        basketX,
        canvasHeight - basketHeight,
        basketWidth,
        basketHeight,
      );
    };

    const checkCollision = (objectX: number, objectY: number) => {
      return (
        objectY + objectSize >= canvasHeight - basketHeight &&
        objectX >= basketX &&
        objectX <= basketX + basketWidth
      );
    };

    const spawnObject = () => {
      setFallingObjects((prev) => {
        if (prev.length < maxObjects && !gameOver) {
          // Arrêt de génération si gameOver
          return [
            ...prev,
            { x: Math.random() * (canvasWidth - objectSize), y: 20 },
          ];
        }
        return prev;
      });
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBackground(ctx);
      drawBasket(ctx);

      // Si le jeu est terminé, on empêche les objets de tomber
      if (gameOver) {
        for (const obj of fallingObjects) {
          drawFallingObject(ctx, obj); // Dessiner les objets figés
        }
        ctx.fillStyle = "red";
        ctx.font = "80px Arial";
        ctx.fillText("GAME OVER", canvasWidth / 2 - 200, canvasHeight / 2);
        return; // Arrêter la boucle de jeu ici
      }

      // Mettre à jour les objets qui tombent uniquement si le jeu n'est pas terminé
      setFallingObjects((prev) => {
        const updatedObjects = prev
          .map((obj) => ({ x: obj.x, y: obj.y + currentSpeed })) // Déplacer les objets
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
            return obj.y <= canvasHeight;
          });

        return updatedObjects;
      });

      // Dessiner les objets tombants
      for (const obj of fallingObjects) {
        drawFallingObject(ctx, obj);
      }

      // Afficher le timer en haut à droite
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText(`Time Left: ${timeLeft}s`, canvasWidth - 230, 50);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = gameLoop;
    animationFrameId = requestAnimationFrame(gameLoop);
    const intervalId = setInterval(spawnObject, spawnRate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
      if (speedUpTimerRef.current) {
        clearInterval(speedUpTimerRef.current); // Nettoyage du timer d'accélération
      }
    };
  }, [basketX, fallingObjects, gameOver, currentSpeed, gameStarted, timeLeft]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      setBasketX((prev) => Math.max(prev - 70, 0));
    } else if (e.key === "ArrowRight") {
      setBasketX((prev) => Math.min(prev + 70, canvasWidth - 100));
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
