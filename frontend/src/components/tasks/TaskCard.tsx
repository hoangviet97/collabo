import React, { useState, FC } from "react";
import { Progress, Avatar, Popover } from "antd";
import { EllipsisOutlined, EditOutlined, UserAddOutlined } from "@ant-design/icons";
import Timer from "../timeTracker/Timer";
import AvatarIcon from "../utils/AvatarIcon";
import AssigneesModal from "../modal/AssigneesModal";
import { task, member } from "../../types/types";

interface Props {
  task: task;
  sectionName: string;
  showModal: any;
  closeModal: any;
  assignees: any;
  members: member[];
}

const TaskCard: FC<Props> = ({ task, sectionName, showModal, closeModal, assignees, members }) => {
  const [assignessModalVisible, setAssignessModalVisible] = useState(false);

  const showAssigness = () => {
    setAssignessModalVisible(true);
  };

  const closeAssigness = () => {
    setAssignessModalVisible(false);
  };

  return (
    <div className="task__card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>{task.statusName}</div>
        <EllipsisOutlined />
      </div>
      <div>
        <a style={{ fontSize: "18px" }} onClick={() => showModal(task, sectionName)}>
          {task.title}
        </a>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
        <Progress percent={task.progress} size="small" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {assignees.length > 0 ? (
            <>
              <Avatar.Group size={32} maxCount={1} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                {assignees.map((assignee: any, index: any) => (
                  <Popover content={assignee.firstname}>
                    <Avatar key={index} style={{ backgroundColor: "#1890ff" }}>
                      <AvatarIcon name={assignee.firstname} />
                    </Avatar>
                  </Popover>
                ))}
              </Avatar.Group>
              <div onClick={showAssigness} style={{ position: "absolute", width: "20px", height: "20px", marginTop: "-48px", borderRadius: "50%", marginLeft: assignees.length < 2 ? "28px" : "50px", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <EditOutlined style={{ fontSize: "10px", color: "#bdc3c7" }} />
              </div>
            </>
          ) : (
            <div onClick={showAssigness} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UserAddOutlined style={{ fontSize: "20px", color: "#bdc3c7" }} />
            </div>
          )}
          {assignessModalVisible && <AssigneesModal task_id={task.id} assignees={assignees} members={members} close={closeAssigness} />}
        </div>
        <Timer localstorage={task.id} />
      </div>
    </div>
  );
};

export default TaskCard;
