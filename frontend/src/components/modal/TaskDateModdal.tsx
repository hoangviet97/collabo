import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateTaskEndDate, updateTaskStartDate } from "../../actions/task";
import { Calendar, Button } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";

interface Props {
  taskId: string;
  type: string;
  show: any;
  close: any;
  pos: any;
}

const TaskDateModdal: FC<Props> = ({ taskId, type, show, close, pos }) => {
  const dispatch = useDispatch();
  const params: any = useParams();

  const modalWidth = 300;
  const modalHeight = 80;

  const x = pos.x - modalWidth / 2;
  const y = pos.y - modalHeight / 2;

  const dateChangeHandler = (value: any) => {
    const date = moment(value._d).format("YYYY-MM-DD hh:mm:ss");
    if (type === "due_date") {
      dispatch(updateTaskEndDate({ id: taskId, date: date, project_id: params.id }));
    } else {
      dispatch(updateTaskStartDate({ id: taskId, date: date, project_id: params.id }));
    }
  };

  return show ? (
    <div className="back-drop" onClick={close} style={{ cursor: "default", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 111111 }}>
      <div id="date-picker__window" onClick={(e) => e.stopPropagation()} style={{ width: "300px", height: "360px", borderRadius: "12px", backgroundColor: "white", zIndex: 8888, position: "relative", top: y, left: x, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <div>
          <Calendar fullscreen={false} onSelect={dateChangeHandler} />
        </div>
        <Button>Reset date</Button>
      </div>
    </div>
  ) : null;
};

export default TaskDateModdal;
