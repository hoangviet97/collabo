import React, { useState, useEffect, FC } from "react";
import { CalendarOutlined, CheckCircleOutlined, EllipsisOutlined, CopyOutlined, FormOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Typography, DatePicker, Tag, Popover } from "antd";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus, updateTaskPriority } from "../../actions/task";
import { createReview } from "../../actions/review";
import { Select } from "antd";
import TaskDateModal from "../modal/TaskDateModdal";
import AvatarIcon from "../utils/AvatarIcon";
import Timer from "../timeTracker/Timer";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import AssigneesModal from "../modal/AssigneesModal";
import { useParams } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { task, member } from "../../types/types";
import moment from "moment";
import TaskDate from "./TaskDate";
import { getPriorityName } from "../../helpers/converter";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  showModal: any;
  closeModal: any;
  sectionName: string;
  assignees: any;
  members: member[];
  task: task;
  start_date: any;
}

const TaskItem: FC<Props> = ({ showModal, closeModal, sectionName, assignees, members, task, start_date }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [done, setDone] = useState(task.statusId);
  const [assignessModalVisible, setAssignessModalVisible] = useState<boolean>(false);
  const today = new Date();

  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);

  const { Text } = Typography;
  const { Option } = Select;

  const sectionMenu = () => (
    <Menu>
      <Menu.Item key="1" onClick={submitTaskHandler}>
        <span>
          <CopyOutlined />
          Submit for review
        </span>
      </Menu.Item>
      <Menu.Item key="3" onClick={deleteTaskHandler}>
        <Text type="danger">
          <DeleteOutlined />
          Delete
        </Text>
      </Menu.Item>
    </Menu>
  );

  const assigneeContent = (data: any) => {
    return `${data.firstname} ${data.lastname} (${data.email})`;
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTask(task.id, params.id));
  };

  const submitTaskHandler = () => {
    dispatch(createReview(task.id, params.id));
  };

  const switchTaskStatusHandler = (value: any) => {
    setDone(value);
    dispatch(updateTaskStatus(task.id, value, params.id));
  };

  const switchPriorityHandler = (value: any) => {
    console.log(getPriorityName(value));
    dispatch(updateTaskPriority(task.id, value, params.id));
  };

  const showAssigness = () => {
    if (task.statusId !== "5" || user_role !== "Member") {
      setAssignessModalVisible(true);
    }
  };

  const closeAssigness = () => {
    setAssignessModalVisible(false);
  };

  const modalHandler = () => {
    if (task.statusId !== "5") {
      showModal(task, sectionName);
    }
  };

  return (
    <div className="task-column">
      <div onClick={modalHandler} className="task-column__item task-column__name" style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden", borderRight: "0.5px solid #dfe4ea", backgroundColor: done === "3" ? "#e2f6d4" : "white" }}>
        <CheckCircleOutlined className="task-column__done" style={{ color: done === "3" ? "#6ab04c" : "#ededed" }} />
        <div className="text-ellipsis">{task.title}</div>
      </div>
      <div className="task-column__item task-column__assignees" style={{ display: "flex", justifyContent: "center", borderRight: "0.5px solid #dfe4ea", backgroundColor: done === "3" ? "#e2f6d4" : "white" }}>
        {assignees.length > 0 ? (
          <>
            <Avatar.Group size={32} maxCount={1} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              {assignees.map((assignee: any, index: number) => (
                <Popover key={index} content={assigneeContent(assignee)}>
                  <Avatar key={index} style={{ backgroundColor: assignee.color === null || assignee.color.length < 1 ? color.normal_orange : assignee.color }}>
                    <AvatarIcon firstname={assignee.firstname} lastname={assignee.lastname} />
                  </Avatar>
                </Popover>
              ))}
            </Avatar.Group>
            {user_role !== "Member" && (
              <div onClick={showAssigness} style={{ position: "absolute", width: "20px", height: "20px", marginTop: "-23px", borderRadius: "50%", marginLeft: assignees.length < 2 ? "47px" : "70px", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <EditOutlined style={{ fontSize: "10px", color: "#bdc3c7" }} />
              </div>
            )}
          </>
        ) : (
          <div onClick={showAssigness} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserAddOutlined style={{ fontSize: "20px", color: "#bdc3c7" }} />
          </div>
        )}
        {assignessModalVisible && <AssigneesModal task_id={task.id} assignees={assignees} members={members} close={closeAssigness} />}
      </div>
      <div className="task-column__item task-column__status task-column__status--active" style={{ borderRight: "0.5px solid #dfe4ea", backgroundColor: done === "3" ? "#e2f6d4" : "white" }}>
        {task.statusId === "5" ? (
          <div className="task__review-title">
            <span>Under Review</span>
          </div>
        ) : (
          <Select className="task-select" defaultValue={task.statusId} disabled={user_role === "Member" ? true : false} onChange={switchTaskStatusHandler} showArrow={false} style={{ width: "100%" }} bordered={false}>
            <Option value="0">Open</Option>
            <Option value="1">In Progress</Option>
            <Option value="2">On Hold</Option>
            <Option value="3">Completed</Option>
            <Option value="4">Canceled</Option>
          </Select>
        )}
      </div>
      <div className="task-column__item task-column__priority" style={{ color: "grey", display: "flex", justifyContent: "center", alignItems: "center", borderRight: "0.5px solid #dfe4ea", backgroundColor: done === "3" ? "#e2f6d4" : "white" }}>
        <Select className="task-select" defaultValue={task.priorityId} disabled={task.statusId === "5" || user_role === "Member" ? true : false} onChange={switchPriorityHandler} showArrow={false} style={{ width: "100%" }} bordered={false}>
          <Option value="0">
            <Tag color="gold">Low</Tag>
          </Option>
          <Option value="1">
            <Tag color="orange">Medium</Tag>
          </Option>
          <Option value="2">
            <Tag color="red">High</Tag>
          </Option>
        </Select>
      </div>
      <div className="task-column__item task-column__due-date" style={{ borderRight: "0.5px solid #dfe4ea", backgroundColor: done === "3" ? "#e2f6d4" : "white" }}>
        <TaskDate id={task.id} date={task.due_date} type="due_date" />
      </div>
      <div className="task-column__item task-column__timer" style={{ borderRight: "0.5px solid #dfe4ea", backgroundColor: done === "3" ? "#e2f6d4" : "white" }}>
        <Timer localstorage={task.id} />
      </div>
      <div className="task-column__item task-column__more" style={{ backgroundColor: done === "3" ? "#e2f6d4" : "white" }}>
        {task.statusId === "5" ? (
          <EllipsisOutlined style={{ fontSize: "22px" }} />
        ) : (
          <Dropdown trigger={["click"]} overlay={sectionMenu} placement="bottomRight">
            <EllipsisOutlined style={{ fontSize: "22px" }} />
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
