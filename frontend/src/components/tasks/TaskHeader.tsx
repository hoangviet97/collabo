import React from "react";
import color from "../../styles/abstract/variables.module.scss";

const TaskHeader = () => {
  return (
    <div className="task-column" style={{ marginBottom: "10px" }}>
      <div className="task-column__item task-column__name task__top-header">Name</div>
      <div className="task-column__item task-column__assignees task__top-header">Assignees</div>
      <div className="task-column__item task-column__status task__top-header">Status</div>
      <div className="task-column__item task-column__priority task__top-header">Priority</div>
      <div className="task-column__item task-column__due-date task__top-header">Due</div>
      <div className="task-column__item task-column__timer task__top-header">Timer</div>
      <div className="task-column__item task-column__more task__top-header">More</div>
    </div>
  );
};

export default TaskHeader;
