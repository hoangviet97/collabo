import React, { FC } from "react";
import moment from "moment";
import { task } from "../../types/types";

interface Props {
  task: task;
}

const TaskPreview: FC<Props> = ({ task }) => {
  return (
    <div className="task-preview">
      <span>{task.title}</span>
      <span>{moment(task.due_date).format("MMM Do YY")}</span>
    </div>
  );
};

export default TaskPreview;
