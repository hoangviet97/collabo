import React from "react";
import moment from "moment";

const TaskPreview = ({ task }) => {
  return (
    <div className="task-preview">
      <span>{task.name}</span>
      <span>{moment(task.due_date).format("MMM Do YY")}</span>
    </div>
  );
};

export default TaskPreview;
