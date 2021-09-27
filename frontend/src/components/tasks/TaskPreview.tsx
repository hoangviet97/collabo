import React, { FC } from "react";
import moment from "moment";

interface Props {
  task: any;
}

const TaskPreview: FC<Props> = ({ task }) => {
  return (
    <div className="task-preview">
      <span>{task.name}</span>
      <span>{moment(task.due_date).format("MMM Do YY")}</span>
    </div>
  );
};

export default TaskPreview;
