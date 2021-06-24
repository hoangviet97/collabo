import React from "react";
import Open from "../../img/icons/Open";
import Canceled from "../../img/icons/Canceled";
import Completed from "../../img/icons/Completed";
import OnHold from "../../img/icons/OnHold";
import InProgress from "../../img/icons/InProgress";

const TaskStatusModal = () => {
  return (
    <div className="task-status-modal">
      <Canceled />
      <Completed />
      <OnHold />
      <InProgress />
      <Open />
    </div>
  );
};

export default TaskStatusModal;
