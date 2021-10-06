import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Modal, Input, Avatar, Popover } from "antd";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import moment from "moment";
import AvatarIcon from "../utils/AvatarIcon";

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
      <div className="task__detail">
        <header className="task__detail__header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f5f6fa", padding: "8px 12px" }}>
          <div className="task__detail-bread" style={{ backgroundColor: "white", padding: "5px 12px", border: "0.5px solid grey", borderRadius: "10px" }}>
            <Breadcrumb>
              <Breadcrumb.Item>{props.task.section_name}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.task.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Button style={{ borderRadius: "10px" }} onClick={() => props.closeModal()}>
            X
          </Button>
        </header>
        <div className="task__detail-body" style={{ width: "100%", height: "100%", display: "flex" }}>
          <div className="task__detail-data" style={{ width: "55%", height: "100%", padding: "20px" }}>
            <div class="task__detail__meta" style={{ display: "flex", justifyContent: "space-between" }}>
              <div class="task__detail__created" style={{ display: "flex", flexDirection: "column" }}>
                <span>Created</span>
                <span>{moment(props.task.created_at).format("MMM Do YYYY, h:mm:ss a")}</span>
              </div>
              <div class="task__detail__assignees" style={{ display: "flex", flexDirection: "column" }}>
                {props.assignees ? (
                  <>
                    <Avatar.Group size={32} maxCount={1} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                      {props.assignees.map((assignee, index) => (
                        <Popover content={assignee.firstname}>
                          <Avatar key={index} style={{ backgroundColor: "#1890ff" }}>
                            <AvatarIcon name={assignee.firstname} />
                          </Avatar>
                        </Popover>
                      ))}
                    </Avatar.Group>
                    <div style={{ position: "absolute", width: "20px", height: "20px", marginTop: "-23px", borderRadius: "50%", marginLeft: "70px", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "9999" }}>
                      <EditOutlined style={{ fontSize: "10px", color: "#bdc3c7" }} />
                    </div>
                  </>
                ) : (
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <UserAddOutlined style={{ fontSize: "20px", color: "#bdc3c7" }} />
                  </div>
                )}
              </div>
            </div>
            <Input value={taskTitle} size="large" />
            <TextArea placeholder="Autosize height based on content lines" autoSize={{ minRows: 8, maxRows: 10 }} />
          </div>
          <div className="task__detail-comments" style={{ backgroundColor: "red", width: "45%", height: "100%" }}>
            fe
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
