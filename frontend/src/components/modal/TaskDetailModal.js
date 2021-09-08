import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Modal, Input } from "antd";
import moment from "moment";

const TaskDetailModal = (props) => {
  const [taskTitle, setTaskTitle] = useState(props.task.title);
  const { TextArea } = Input;

  useEffect(() => {
    setTaskTitle(props.task.title);

    return () => {
      setTaskTitle("");
    };
  }, [props]);

  return (
    <Modal visible={props.isVisible} width="95%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}>
      <div className="task-detail">
        <header className="task-detail__header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f5f6fa", padding: "8px 12px" }}>
          <div className="task-detail-bread" style={{ backgroundColor: "white", padding: "5px 12px", border: "0.5px solid grey", borderRadius: "10px" }}>
            <Breadcrumb>
              <Breadcrumb.Item>{props.task.section_name}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.task.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Button style={{ borderRadius: "10px" }} onClick={() => props.closeModal()}>
            X
          </Button>
        </header>
        <div className="task-detail-body" style={{ width: "100%", height: "100%", display: "flex" }}>
          <div className="task-detail-data" style={{ width: "55%", height: "100%", padding: "20px" }}>
            <div class="task-detail__meta">
              <div class="task-detail__created" style={{ display: "flex", flexDirection: "column" }}>
                <span>Created</span>
                <span>{moment(props.task.created_at).format("MMM Do YYYY, h:mm:ss a")}</span>
              </div>
            </div>
            <Input value={taskTitle} size="large" />
            <TextArea placeholder="Autosize height based on content lines" autoSize={{ minRows: 8, maxRows: 10 }} />
          </div>
          <div className="task-detail-comments" style={{ backgroundColor: "red", width: "45%", height: "100%" }}>
            fe
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
