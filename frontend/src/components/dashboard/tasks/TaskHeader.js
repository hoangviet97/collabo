import React from "react";

const TaskHeader = () => {
  return (
    <div className="task-header">
      <div className="task-header-item task-column__name">Task Name</div>
      <div className="task-header-item task-column__assignees">Assignees</div>
      <div className="task-header-item task-column__status">Status</div>
      <div className="task-header-item task-column__priority">Priority</div>
      <div className="task-header-item task-column__due-date">Due Date</div>
      <div className="task-header-item task-column__more">More</div>
    </div>
  );
};

export default TaskHeader;
