import React from "react";
import moment from "moment";

const TaskPreview = (props) => {
  return (
    <div className="task-preview" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#ecf0f1", padding: "15px 10px", marginBottom: "7px", borderRadius: "10PX" }}>
      <span>{props.task.name}</span>
      <span>{moment(props.task.due_date).format("MMM Do YY")}</span>
    </div>
  );
};

export default TaskPreview;
