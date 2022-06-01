import React, { useState, useRef, useEffect, FC } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import moment from "moment";
import { createTimeRecord } from "../../actions/time_record";
import { useDispatch } from "react-redux";

interface Props {
  localstorage: any;
  project_id: string;
}

const Timer: FC<Props> = ({ localstorage, project_id }) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<number>(0);
  let finalFormat = "";
  const [isActive, setIsActive] = useState<any>(false);
  const countRef: any = useRef(null);

  const handleStart = () => {
    let now = new Date();
    let val: any = JSON.parse(localStorage.getItem(`timer${localstorage}`)!);

    if (!val) {
      localStorage.setItem(`timer${localstorage}`, JSON.stringify(now));
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
    const datem = moment(JSON.parse(localStorage.getItem(`timer${localstorage}`)!));
    const datem2 = moment(new Date());
    dispatch(createTimeRecord({ start: moment(datem).format("YYYY-MM-DD hh:mm:ss"), end: moment(datem2).format("YYYY-MM-DD hh:mm:ss"), task_id: localstorage, total: datem2.diff(datem, "seconds"), project_id: project_id }));
    localStorage.removeItem(`timer${localstorage}`);
    setTimer(0);
  };

  useEffect(() => {
    let val = JSON.parse(localStorage.getItem(`timer${localstorage}`)!);

    if (val) {
      const date1 = moment(JSON.parse(localStorage.getItem(`timer${localstorage}`)!));
      const date2 = moment(new Date());
      setTimer(date2.diff(date1, "seconds"));
      handleStart();
    }
  }, []);

  const formatTime = () => {
    const getSeconds: any = `0${timer % 60}`.slice(-2);
    const minutes: any = `${Math.floor(timer / 60)}`;
    const getMinutes: any = `0${minutes % 60}`.slice(-2);
    const getHours: any = `0${Math.floor(timer / 3600)}`.slice(-2);
    finalFormat = `${getHours}:${getMinutes}:${getSeconds}`;

    return finalFormat;
  };

  return (
    <div>
      <div className="stopwatch-card" style={{ border: "0.5px solid #ecf0f1", display: "inline-block", borderRadius: "12px", backgroundColor: isActive ? "#e74c3c" : "white", color: isActive && "white" }}>
        <div className="stopwatch-content" style={{ display: "flex", padding: "5px 8px", gap: "12px" }}>
          <span>{formatTime()}</span>
          <div className="buttons">
            {!isActive ? (
              <button style={{ border: "none", backgroundColor: "transparent" }} onClick={handleStart}>
                <CaretRightOutlined />
              </button>
            ) : (
              <button style={{ border: "none", backgroundColor: "transparent" }} onClick={handleReset}>
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