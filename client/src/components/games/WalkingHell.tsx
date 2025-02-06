import { useCallback, useEffect, useRef, useState } from "react";
import { useContextProvider } from "../context/ArcadiaContext";
import "./WalkingHell.css";

const WalkingDead: React.FC = () => {
  const canvasWidth = 1280;
  const canvasHeight = 720;
  const jumpHeight = 300;
  const jumpDuration = 300;

  const { userScores, setUserScores } = useContextProvider();
  const [userGameScore, setUserGameScore] = useState<number>(0);
  console.info(userScores);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const obstaclesRef = useRef<
    { x: number; y: number; type: string; wasScored: boolean }[]
  >([]);

  const [characterY, setCharacterY] = useState(canvasHeight - 80);
  const [characterAction, setCharacterAction] = useState<
    "run" | "jump" | "duck"
  >("run");
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(6);
  console.info(characterAction);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp") {
      setCharacterAction("jump");
      const startY = canvasHeight - 100;
      const startTime = Date.now();

      const animateJump = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / jumpDuration;
        if (progress < 1) {
          setCharacterY(startY - jumpHeight * Math.sin(Math.PI * progress));
          requestAnimationFrame(animateJump);
        } else {
          setCharacterY(canvasHeight - 50);
          setCharacterAction("run");
        }
      };
      requestAnimationFrame(animateJump);
    } else if (e.key === "ArrowDown") {
      setCharacterAction("duck");
      setCharacterY(canvasHeight - 20);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === " ") {
      setCharacterAction("run");
      setCharacterY(canvasHeight - 50);
    }
  };

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#dcedc1";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Dessiner le personnage
    ctx.fillStyle = "blue";
    ctx.fillRect(50, characterY, 20, 50);

    // Mise à jour des obstacles
    obstaclesRef.current = obstaclesRef.current
      .map((obj) => {
        const updatedObj = { ...obj, x: obj.x - currentSpeed };

        if (
          updatedObj.x < 70 &&
          updatedObj.x > 50 &&
          Math.abs(updatedObj.y - characterY) < 30
        ) {
          if (!updatedObj.wasScored) {
            if (updatedObj.type === "heart") {
              setUserGameScore((prevScore) => prevScore + 4);
            } else if (updatedObj.type === "bomb") {
              setGameOver(true);
              setUserScores((prevScore) => prevScore + userGameScore);
              setUserGameScore(0);
            } else {
              setUserGameScore((prevScore) => prevScore + 1);
            }
            updatedObj.wasScored = true;
            return null;
          }
        }

        return updatedObj.x > -50 ? updatedObj : null;
      })
      .filter(
        (
          obj,
        ): obj is { x: number; y: number; type: string; wasScored: boolean } =>
          obj !== null,
      );

    // Dessiner les obstacles
    for (const { x, y, type } of obstaclesRef.current) {
      const emoji = type === "heart" ? "❤️" : type === "bomb" ? "💣" : "📦";
      ctx.font = "40px Arial";
      ctx.fillText(emoji, x, y);
    }

    if (!gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      ctx.fillStyle = "red";
      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2);
    }
  }, [characterY, currentSpeed, gameOver, setUserScores, userGameScore]);

  const spawnObstacle = useCallback(() => {
    if (obstaclesRef.current.length >= 5) return;

    const obstacleTypes = ["heart", "box", "bomb"];
    const type =
      obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

    const yPositions = [
      canvasHeight - 40,
      canvasHeight - 60,
      canvasHeight - 80,
      canvasHeight - 100,
      canvasHeight - 120,
    ];
    const y = yPositions[Math.floor(Math.random() * yPositions.length)];

    obstaclesRef.current.push({ x: canvasWidth, y, type, wasScored: false });
  }, []);

  const startGame = () => {
    setGameStarted(true);
    restartGame();
    setUserGameScore(0);
  };

  const restartGame = () => {
    obstaclesRef.current = [];
    setGameOver(false);
    setCharacterY(canvasHeight - 50);
    setCharacterAction("run");
    setCurrentSpeed(6);
    setUserGameScore(0);

    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (!gameStarted) return;

    const obstacleInterval = setInterval(spawnObstacle, 800);
    gameLoop();

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      clearInterval(obstacleInterval);
    };
  }, [gameStarted, gameLoop, spawnObstacle]);

  return (
    <div
      className="walkingclass"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
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

export default WalkingDead;
