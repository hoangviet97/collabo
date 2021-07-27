import React, { useState } from "react";
import { connect } from "react-redux";
import { updateTaskStartDate, updateTaskEndDate } from "../../actions/task";
import { Calendar, Button } from "antd";
import moment from "moment";

const TaskDateModdal = ({ taskId, start_date, due_date, show, close, pos, updateTaskStartDate, updateTaskEndDate }) => {
  const [startView, setStartView] = useState(false);
  const [dueView, setDueView] = useState(true);
  const [startDate, setStartDate] = useState("");

  const modalWidth = 300;
  const modalHeight = 80;

  const x = pos.x - modalWidth / 2;
  const y = pos.y - modalHeight / 2;

  const switcher = () => {
    setStartView((prev) => !prev);
    setDueView((prev) => !prev);
  };

  const startDateChange = (value) => {
    const date = moment(value).format("YYYY-MM-DD hh:mm:ss");
    updateTaskStartDate({ id: taskId, date: date });
  };

  const endDateChange = (value) => {
    const date = moment(value).format("YYYY-MM-DD hh:mm:ss");
    updateTaskEndDate({ id: taskId, date: date });
  };

  return show ? (
    <div className="back-drop" onClick={close} style={{ cursor: "default", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 111111 }}>
      <div id="date-picker__window" onClick={(e) => e.stopPropagation()} style={{ width: "300px", height: "360px", zIndex: 999999, borderRadius: "12px", backgroundColor: "white", zIndex: "8998", position: "relative", top: y, left: x, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <Calendar fullscreen={false} onSelect={startDateChange} onCalendarChange={(e) => e.stopPropagation()} style={{ display: startView ? "block" : "none" }} />
        <Calendar fullscreen={false} onSelect={endDateChange} onCalendarChange={(e) => e.stopPropagation()} style={{ display: dueView ? "block" : "none" }} />
        <Button disabled={startView} onClick={switcher}>
          Start Date
        </Button>
        <Button disabled={dueView} onClick={switcher}>
          End Date
        </Button>
      </div>
    </div>
  ) : null;
};

export default connect(null, { updateTaskStartDate, updateTaskEndDate })(TaskDateModdal);
