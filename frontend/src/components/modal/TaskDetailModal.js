import React from "react";
import { connect } from "react-redux";
import { Breadcrumb, Button } from "antd";

const TaskDetailModal = (props) => {
  return (
    <div style={{ backgroundColor: "rgba(74, 74, 74, 0.59)", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999990 }}>
      <div className="task-detail-window" style={{ backgroundColor: "white", position: "absolute", top: "50%", left: "50%", right: 0, bottom: 0, transform: "translate(-50%, -50%)", zIndex: 999999, width: "95%", height: "95vh", borderRadius: "12px" }}>
        <header className="task-detail-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "grey", padding: "8px 10px", borderTopRightRadius: "12px", borderTopLeftRadius: "12px" }}>
          <div class="task-detail-bread">
            <Breadcrumb style={{ color: "white" }}>
              <Breadcrumb.Item>{props.projectName}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.taskName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Button onClick={props.closeModal}>X</Button>
        </header>
      </div>
    </div>
  );
};

export default TaskDetailModal;
