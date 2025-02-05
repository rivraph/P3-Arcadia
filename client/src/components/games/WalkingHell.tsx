import { useEffect, useRef, useState } from "react";
import { useContextProvider } from "../context/ArcadiaContext";
import "./WalkingHell.css";

const WalkingDead: React.FC = () => {
  const canvasWidth = 1280;
  const canvasHeight = 720;
  const gameInterval = 1000 / 60;
  const jumpHeight = 200;
  const jumpDuration = 800;

  const { userScores, setUserScores } = useContextProvider();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameLoopRef = useRef<(() => void) | null>(null);
  const [characterY, setCharacterY] = useState(canvasHeight - 50);
  const [characterAction, setCharacterAction] = useState<
    "run" | "jump" | "duck" | "punch"
  >("run");
  const [obstacles, setObstacles] = useState<
    { x: number; y: number; type: string; wasScored: boolean }[]
  >([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(2);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp" && characterAction === "run") {
      setCharacterAction("jump");
      const startY = canvasHeight - 50;
      const startTime = Date.now();

      const animateJump = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / jumpDuration;
        if (progress < 0.5) {
          setCharacterY(startY - jumpHeight * Math.sin(Math.PI * progress));
        } else if (progress < 1) {
          setCharacterY(startY - jumpHeight * Math.sin(Math.PI * progress));
        } else {
          setCharacterY(canvasHeight - 50);
          setCharacterAction("run");
        }
        if (progress < 1) {
          requestAnimationFrame(animateJump);
        }
      };
      requestAnimationFrame(animateJump);
    } else if (e.key === "ArrowDown") {
      setCharacterAction("duck");
      setCharacterY(canvasHeight - 15);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === " ") {
      setCharacterAction("run");
      setCharacterY(canvasHeight - 50);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    restartGame();
  };

  const restartGame = () => {
    setObstacles([]);
    setGameOver(false);
    setCharacterY(canvasHeight - 50);
    setCharacterAction("run");
    setCurrentSpeed(2);
    if (gameLoopRef.current) {
      requestAnimationFrame(gameLoopRef.current);
    }
  };

  useEffect(() => {
    const drawSpeedGauge = (ctx: CanvasRenderingContext2D) => {
      const MAX_SPEED = 50;
      const gaugeWidth = 100;
      const gaugeHeight = 20;
      const x = 10;
      const y = 10;

      const progress = (currentSpeed - 8) / (MAX_SPEED - 8);
      const red = Math.min(255, Math.floor(progress * 255));
      const green = Math.max(0, 255 - Math.floor(progress * 255));
      const color = `rgb(${red},${green},0)`;

      ctx.fillStyle = "#ddd";
      ctx.fillRect(x, y, gaugeWidth, gaugeHeight);

      ctx.fillStyle = color;
      ctx.fillRect(x, y, gaugeWidth * progress, gaugeHeight);

      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, gaugeWidth, gaugeHeight);

      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.fillText(
        `Speed: ${Math.round(progress * 100)}%`,
        x + gaugeWidth + 10,
        y + 15,
      );
    };

    const drawObstacle = (
      ctx: CanvasRenderingContext2D,
      obstacle: { x: number; y: number; type: string },
    ) => {
      const emoji =
        obstacle.type === "heart"
          ? "❤️"
          : obstacle.type === "box"
            ? "📦"
            : obstacle.type === "bomb"
              ? "💣"
              : obstacle.type === "flower"
                ? "🌸"
                : "🐶";
      ctx.font = "20px Arial";
      ctx.fillText(emoji, obstacle.x, obstacle.y);
    };

    const drawBackground = (ctx: CanvasRenderingContext2D) => {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvasWidth,
        canvasHeight,
      );
      gradient.addColorStop(0, "#a8e6cf");
      gradient.addColorStop(1, "#dcedc1");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    };

    const drawGameOver = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "red";
      ctx.font = "50px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2);
    };

    const drawCharacter = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "blue";
      ctx.fillRect(50, characterY, 20, 50);
    };

    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationFrameId: number;

    const spawnObstacle = () => {
      setObstacles((prev) => {
        if (prev.length >= 5) return prev;

        const obstacleTypes = ["heart", "box", "bomb", "flower", "animal"];
        const type =
          obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];

        const yPositions = [
          canvasHeight - 20,
          canvasHeight - 60,
          canvasHeight - 100,
          canvasHeight - 140,
        ];
        const y = yPositions[Math.floor(Math.random() * yPositions.length)];

        return [...prev, { x: canvasWidth, y, type, wasScored: false }];
      });
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBackground(ctx);
      drawSpeedGauge(ctx);
      drawCharacter(ctx);
      gameLoopRef.current = gameLoop;

      setObstacles((prev) =>
        prev
          .map((obj) => {
            const updatedObj = { ...obj, x: obj.x - currentSpeed };

            if (
              updatedObj.x < 70 &&
              updatedObj.x > 50 &&
              Math.abs(updatedObj.y - characterY) < 30
            ) {
              if (!updatedObj.wasScored) {
                if (updatedObj.type === "heart") {
                  setUserScores((prevScore) => prevScore + 4);
                } else if (updatedObj.type === "bomb") {
                  setGameOver(true);
                } else {
                  setUserScores((prevScore) => prevScore + 1);
                }
                updatedObj.wasScored = true;
              }
            }

            return updatedObj.x > -50 ? updatedObj : null;
          })
          .filter(
            (
              obj,
            ): obj is {
              x: number;
              y: number;
              type: string;
              wasScored: boolean;
            } => obj !== null,
          ),
      );

      for (const obj of obstacles) {
        drawObstacle(ctx, obj);
      }

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      } else {
        drawGameOver(ctx);
      }
    };

    const obstacleInterval = setInterval(spawnObstacle, gameInterval);

    gameLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(obstacleInterval);
    };
  }, [
    gameStarted,
    gameOver,
    obstacles,
    currentSpeed,
    characterY,
    setUserScores,
  ]);

  useEffect(() => {
    if (userScores >= 50) {
      setCurrentSpeed((prevSpeed) => Math.min(prevSpeed + 2, 50));
    }
  }, [userScores]);

  return (
    <div
      className="walkingclass"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      style={{ outline: "none" }}
    >
      <p>Game Score: {userScores}</p>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black", background: "#eee" }}
      >
        {" "}
      </canvas>
      {gameOver && (
        <p style={{ color: "red" }}>Game Over! Final Score: {userScores}</p>
      )}
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
