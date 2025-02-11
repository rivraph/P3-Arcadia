import { useCallback, useEffect, useRef, useState } from "react";
import { useContextProvider } from "../context/ArcadiaContext";
import "./WalkingHell.css";

const WalkingDead: React.FC = () => {
  const [showGameOver, setShowGameOver] = useState(false);
  const canvasWidth = 1280;
  const canvasHeight = 720;
  const characterHeight = canvasHeight * 0.2; // 20% de la hauteur de l'écran
  const characterWidth = 20;
  const jumpHeight = canvasHeight - characterHeight;
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
    if (gameOver) {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#dcedc1";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Dessiner le personnage
    ctx.fillStyle = "blue";
    ctx.fillRect(50, characterY, characterWidth, characterHeight);

    // Mise à jour des obstacles
    obstaclesRef.current = obstaclesRef.current
      .map((obj) => {
        const updatedObj = { ...obj, x: obj.x - currentSpeed };

        const obstacleWidth = 40;
        const obstacleHeight = 40;

        const isColliding =
          updatedObj.x < 50 + characterWidth &&
          updatedObj.x + obstacleWidth > 50 &&
          updatedObj.y < characterY + characterHeight &&
          updatedObj.y + obstacleHeight > characterY;

        if (isColliding) {
          if (!updatedObj.wasScored) {
            if (updatedObj.type === "heart") {
              setUserGameScore((prevScore) => prevScore + 4);
            } else if (updatedObj.type === "bomb") {
              setGameOver(true);
              setShowGameOver(true);
              setUserScores((prevScore) => prevScore + userGameScore);
              setUserGameScore(0);

              if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
              }
              return null;
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

    // 🔥 Afficher "GAME OVER" au centre en cas de défaite
    if (gameOver) {
      ctx.fillStyle = "red";
      ctx.font = "80px Arial"; // 🔥 Texte en gros
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2);
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [
    characterY,
    currentSpeed,
    gameOver,
    setUserScores,
    userGameScore,
    characterHeight,
  ]);

  const spawnObstacle = useCallback(() => {
    if (obstaclesRef.current.length >= 5) return;

    const obstacleTypes = ["heart", "box", "bomb"];
    const type =
      obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

    const y = Math.random() * (canvasHeight - 35); // 🔥 Position aléatoire en hauteur

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
    <>
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
      {showGameOver && <div className="game-over-overlay">GAME OVER</div>}
    </>
  );
};

export default WalkingDead;
