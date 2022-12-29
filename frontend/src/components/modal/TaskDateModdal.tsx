import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { updateTaskEndDate, updateTaskStartDate } from "../../redux/actions/task";
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
      dispatch(updateTaskEndDate(taskId, date, params.id));
    } else {
      dispatch(updateTaskStartDate(taskId, date, params.id));
    }
  };

  return show ? (
    <div className="back-drop" onClick={close}>
      <div className="date-picker__window" onClick={(e) => e.stopPropagation()} style={{ top: y, left: x }}>
        <div>
          <Calendar fullscreen={false} onSelect={dateChangeHandler} />
        </div>
        <Button>Reset date</Button>
      </div>
    </div>
  ) : null;
};

export default TaskDateModdal;
