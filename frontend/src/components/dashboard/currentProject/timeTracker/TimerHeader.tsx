import React, { useEffect, useState } from "react";
import moment from "moment";

interface Record {
  id: string;
  start: Date;
  end: Date;
  created_at: Date;
  tasks_id: string;
  users_id: string;
  total: number;
  description?: string;
  task_title: string;
  section_name: string;
}

interface Props {
  records: Array<Record>;
}

const TimerHeader: React.FC<Props> = ({ records }) => {
  const [total, setTotal] = useState<number>(0);
  const [totalToday, setTotalToday] = useState<number>(0);

  useEffect(() => {
    const today: Date = new Date();
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
      <div className="time-header__item">
        <div className="time-header__container">
          <span>Daily Avg time</span>
        </div>
      </div>
      <div className="time-header__item" style={{ width: "25%" }}>
        <div className="time-header__container">
          <span>Total Time</span>
        </div>
      </div>
    </div>
  );
};

export default TimerHeader;
