import React, { FC, useState } from "react";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";
import TaskDateModal from "../modal/TaskDateModdal";

interface Props {
  id: string;
  date: Date | null;
  type: string;
}

const TaskDate: FC<Props> = ({ id, date, type }) => {
  const [datePosition, setDatePosition] = useState({ x: 0, y: 0 });
  const [datePicker, setDatePicker] = useState<any | null>(null);
  const today = new Date();

  const getE = (e: any) => {
    var elem = e.target;
    var rect = elem.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop;
    const absoluteY = scrollTop + rect.top;
    setDatePosition({ x: e.pageX, y: absoluteY });
  };

  const openDateHandler = (id: any) => {
    setDatePicker(id);
  };

  const closeDateHandler = () => {
    setDatePicker(null);
  };

  return (
    <div>
      {date === null ? (
        <CalendarOutlined
          onClick={(e) => {
            openDateHandler(id);
            getE(e);
          }}
          className="task-calendar__icon"
        />
      ) : (
        <span
          onClick={(e) => {
            openDateHandler(id);
            getE(e);
          }}
        >
          {moment(date).format("MMM Do YY")}
        </span>
      )}
      <TaskDateModal taskId={id} type={type} show={datePicker} close={closeDateHandler} pos={datePosition} />
    </div>
  );
};

export default TaskDate;
