import React, { useState } from "react";
import { Calendar, Button } from "antd";

const TaskDateModdal = ({ show, close, pos }) => {
  const [calendarView, setCalendarView] = useState({ start: true, end: false });

  const modalWidth = 300;
  const modalHeight = 80;

  const x = pos.x - modalWidth / 2;
  const y = pos.y - modalHeight / 2;

  const switcher = () => {
    setCalendarView((prev) => ({ start: !prev, end: !prev }));
  };

  return show ? (
    <div className="back-drop" onClick={close} style={{ cursor: "default", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 111111 }}>
      <div id="date-picker__window" onClick={(e) => e.stopPropagation()} style={{ width: "300px", height: "360px", zIndex: 999999, borderRadius: "12px", backgroundColor: "white", zIndex: "8998", position: "relative", top: y, left: x, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <Calendar fullscreen={false} onCalendarChange={(e) => e.stopPropagation()} />
        <Button onClick={switcher} disabled={calendarView.start}>
          Start Date
        </Button>
        <Button onClick={switcher} disabled={calendarView.end}>
          End Date
        </Button>
      </div>
    </div>
  ) : null;
};

export default TaskDateModdal;
