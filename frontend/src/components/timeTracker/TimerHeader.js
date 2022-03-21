import React, { useEffect, useState } from "react";
import moment from "moment";

const TimerHeader = ({ records }) => {
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);

  useEffect(() => {
    const today = new Date();
    records.map((item) => {
      setTotal((prev) => prev + item.total);
    });

    records.filter((i) => moment(i.created_at).format("YYYY MM DD") === moment(today).format("YYYY MM DD")).map((item) => setTotalToday((prev) => prev + item.total));

    return () => {
      setTotal(0);
      setTotalToday(0);
    };
  }, [records]);

  return (
    <div className="time-header">
      <div className="time-header__item">
        <div className="time-header__container">
          <span>Total Time</span>
          <span className="time-header__value">
            {`${Math.floor(total / 3600)}`.slice(-2)}h {`0${Math.floor(total / 60) % 60}`.slice(-2)}m
          </span>
        </div>
      </div>
      <div className="time-header__item">
        <div className="time-header__container">
          <span>Time Today</span>
          <span className="time-header__value">
            {`${Math.floor(totalToday / 3600)}`.slice(-2)}h {`0${Math.floor(totalToday / 60) % 60}`.slice(-2)}m
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimerHeader;
