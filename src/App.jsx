import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const [birdY, setBirdY] = useState(200);
  const [gravity, setGravity] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = useRef(null);
  const birdRef = useRef(null);
  const gameTimer = useRef(null);

  useEffect(() => {
    if (!gameOver) {
      gameTimer.current = setInterval(moveBird, 20);
      document.addEventListener("keydown", jump);
      return () => {
        clearInterval(gameTimer.current);
        document.removeEventListener("keydown", jump);
      };
    } else {
      clearInterval(gameTimer.current);
    }
  }, [gameOver]);

  const moveBird = () => {
    setBirdY((prevY) => prevY + gravity);
    setGravity((prevGravity) => prevGravity + 0.05);

    const gameArea = gameAreaRef.current.getBoundingClientRect();
    const bird = birdRef.current.getBoundingClientRect();

    if (bird.bottom >= gameArea.bottom || bird.top <= gameArea.top) {
      endGame();
    }
  };

  const jump = (e) => {
    if (e.code === "Space") {
      setGravity(-5);
    }
  };

  const endGame = () => {
    setGameOver(true);
    alert("Game Over!");
  };

  return (
    <div className="gameArea" ref={gameAreaRef}>
      {!gameOver && (
        <div className="bird" style={{ top: `${birdY}px` }} ref={birdRef}></div>
      )}
      <div className="sky"></div>
    </div>
  );
};

export default App;
