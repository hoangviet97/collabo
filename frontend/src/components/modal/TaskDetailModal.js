import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Button, Modal, Input } from "antd";

const TaskDetailModal = (props) => {
  const [taskName, setTaskName] = useState("");
  const { TextArea } = Input;

  return (
    <Modal visible={props.isModalVisible} width="90%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}>
      <div className="task-detail-window">
        <header className="task-detail-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f5f6fa", padding: "8px 12px" }}>
          <div class="task-detail-bread" style={{ backgroundColor: "white", padding: "5px 12px", border: "0.5px solid grey", borderRadius: "10px" }}>
            <Breadcrumb>
              <Breadcrumb.Item>{props.sectionName}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.taskDetail && props.taskDetail.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Button style={{ borderRadius: "10px" }} onClick={props.closeModal}>
            X
          </Button>
        </header>
        <div class="task-detail-body" style={{ width: "100%", height: "100%", display: "flex" }}>
          <div class="task-detail-data" style={{ width: "55%", height: "100%", padding: "20px" }}>
            <Input size="large" />
            <TextArea rows={4} />
          </div>
          <div class="task-detail-comments" style={{ backgroundColor: "red", width: "45%", height: "100%" }}>
            fe
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
