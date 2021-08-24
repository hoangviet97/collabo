import React, { useState, useRef, useEffect } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import moment from "moment";

const Timer = (props) => {
  const [timer, setTimer] = useState(0);
  let finalFormat = "";
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef(null);

  const handleStart = () => {
    let now = new Date();
    let val = JSON.parse(localStorage.getItem(`timer${props.localstorage}`));

    if (!val) {
      localStorage.setItem(`timer${props.localstorage}`, JSON.stringify(now));
    }

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
    const datem = moment(JSON.parse(localStorage.getItem(`timer${props.localstorage}`)));
    const datem2 = moment(new Date());
    console.log(datem2.diff(datem, "seconds"));
    localStorage.removeItem(`timer${props.localstorage}`);
    setTimer(0);
  };

  useEffect(() => {
    let val = JSON.parse(localStorage.getItem(`timer${props.localstorage}`));

    if (val) {
      const date1 = moment(JSON.parse(localStorage.getItem(`timer${props.localstorage}`)));
      const date2 = moment(new Date());
      setTimer(date2.diff(date1, "seconds"));
      handleStart();
    } else {
      console.log("its not there");
    }
  }, []);

  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    finalFormat = `${getHours}:${getMinutes}:${getSeconds}`;

    return finalFormat;
  };

  return (
    <div>
      <div className="stopwatch-card" style={{ border: "0.5px solid #ecf0f1", display: "inline-block", borderRadius: "12px", backgroundColor: isActive ? "#e74c3c" : "white", color: isActive && "white" }}>
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
