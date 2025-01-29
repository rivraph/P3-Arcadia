import { useRef, useState } from "react";
import "./Meteorite.css";
import { useEffect } from "react";

const FallingObjectsGame = () => {
  const canvasWidth = 1280;
  const canvasHeight = 720;
  const gameInterval = 1000 / 60;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameLoopRef = useRef<(() => void) | null>(null);
  const [basketX, setBasketX] = useState(canvasWidth / 2 - 50);
  const [fallingObjects, setFallingObjects] = useState<
    { x: number; y: number }[]
  >([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(4);

  const startGame = () => {
    setGameStarted(true);
  };

  const restartGame = () => {
    setScore(0);
    setFallingObjects([]);
    setGameOver(false);
    setCurrentSpeed(4);
    if (gameLoopRef.current) {
      requestAnimationFrame(gameLoopRef.current);
    }
  };

  useEffect(() => {
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

    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let animationFrameId: number;
    const basketWidth = 100;
    const basketHeight = 20;
    const objectSize = 10;

    const spawnObject = () => {
      setFallingObjects((prev) => [
        ...prev,
        { x: Math.random() * (canvasWidth - objectSize), y: 0 },
      ]);
    };

    const checkCollision = (objectX: number, objectY: number) => {
      return (
        objectY + objectSize >= canvasHeight - basketHeight &&
        objectX >= basketX &&
        objectX <= basketX + basketWidth
      );
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBackground(ctx);
      drawBasket(ctx);
      setFallingObjects((prev) => {
        const updatedObjects = prev
          .map((obj) => ({ x: obj.x, y: obj.y + currentSpeed }))
          .filter((obj) => {
            if (checkCollision(obj.x, obj.y)) {
              setScore((prevScore) => {
                const newScore = prevScore + 1;
                if (newScore % 50 === 0) {
                  setCurrentSpeed((prevSpeed) => prevSpeed + 1);
                }
                return newScore;
              });
              return false;
            }
            if (obj.y > canvasHeight) {
              setGameOver(true);
              return false;
            }
            return true;
          });
        return updatedObjects;
      });

      for (const obj of fallingObjects) {
        drawFallingObject(ctx, obj);
      }

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoopRef.current = gameLoop;
    animationFrameId = requestAnimationFrame(gameLoop);
    const intervalId = setInterval(spawnObject, gameInterval);

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
  };

  return (
    <div
      className="meteoriteclass"
      onKeyDown={handleKeyDown}
      style={{ outline: "none" }}
    >
      <p>Score: {score}</p>
      {gameOver && <p style={{ color: "red" }}>Good Luck</p>}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: "1px solid black", background: "black" }}
      >
        {" "}
      </canvas>
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

export default FallingObjectsGame;
