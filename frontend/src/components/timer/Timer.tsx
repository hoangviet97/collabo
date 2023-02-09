import React, { useState, useRef, useEffect, FC } from "react";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import moment from "moment";
import { createTimeRecord } from "../../redux/actions/time_record";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

interface Props {
  localstorage: string;
  disabled: boolean;
}

const Timer: FC<Props> = ({ localstorage, disabled }) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();
  const [timer, setTimer] = useState<number>(0);
  let finalFormat: string = "";
  const [isActive, setIsActive] = useState<boolean>(false);
  const countRef: any = useRef(null);

  const handleStart = () => {
    let now = new Date();
    let val: string = JSON.parse(localStorage.getItem(`timer${localstorage}`)!);

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
    dispatch(createTimeRecord(moment(datem).format("YYYY-MM-DD hh:mm:ss"), moment(datem2).format("YYYY-MM-DD hh:mm:ss"), localstorage, datem2.diff(datem, "seconds"), params.id));
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
    const getSeconds: string = `0${timer % 60}`.slice(-2);
    const minutes: any = `${Math.floor(timer / 60)}`;
    const getMinutes: string = `0${minutes % 60}`.slice(-2);
    const getHours: string = `0${Math.floor(timer / 3600)}`.slice(-2);
    finalFormat = `${getHours}:${getMinutes}:${getSeconds}`;

    return finalFormat;
  };

  return (
    <div>
      <div className="time__button" style={{ backgroundColor: isActive ? "#e74c3c" : "white", color: isActive ? "white" : "black" }}>
        <div className="time__button-content">
          <span>{formatTime()}</span>
          <div className="buttons">
            {!isActive ? (
              <button disabled={disabled} data-testid="start" className="time__button-action" onClick={handleStart}>
                <CaretRightOutlined />
              </button>
            ) : (
              <button data-testid="pause" className="time__button-action" onClick={handleReset}>
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
