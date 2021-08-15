import React, { useState, useRef } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    const now = Date.now();

    setIsActive(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handleReset = () => {
    // Reset button logic here
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div>
      <div className="stopwatch-card" style={{ border: "0.5px solid black", display: "inline-block", borderRadius: "12px" }}>
        <div class="stopwatch-content" style={{ display: "flex", padding: "5px 8px", gap: "12px" }}>
          <span>{formatTime()}</span>
          <div className="buttons">
            {!isActive ? (
              <button onClick={handleStart}>
                <CaretRightOutlined />
              </button>
            ) : (
              <button onClick={handleReset}>
                <PauseOutlined />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
