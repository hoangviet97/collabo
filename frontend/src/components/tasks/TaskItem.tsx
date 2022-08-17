import React, { useState, FC } from "react";
import { CheckCircleOutlined, EllipsisOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Typography, Tag, Popover, message } from "antd";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus, updateTaskPriority } from "../../actions/task";
import { createReview } from "../../actions/review";
import { Select } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import Timer from "../timeTracker/Timer";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import AssigneesModal from "../modal/AssigneesModal";
import { useParams, useLocation, Redirect } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import { task, member } from "../../types/types";
import TaskDate from "./TaskDate";
import { getPriorityName } from "../../helpers/converter";
import color from "../../styles/abstract/variables.module.scss";
import { getStatusColor } from "../../helpers/colorConverter";

interface Props {
  showModal: (task: task, sectionName: string) => void;
  closeModal: () => void;
  sectionName: string;
  assignees: any;
  members: member[];
  task: task;
  start_date: Date;
  match: any;
}

const TaskItem: FC<Props> = ({ showModal, closeModal, sectionName, assignees, members, task, start_date, match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const loc = useLocation();
  const [done, setDone] = useState(task.statusId);
  const [assignessModalVisible, setAssignessModalVisible] = useState<boolean>(false);

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
    if (localStorage.getItem(`timer${task.id}`) === null) {
      dispatch(createReview(task.id, params.id));
    } else {
      message.error("Timer is running!");
    }
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
      <div onClick={modalHandler} className="task-column__item task-column__name" style={{ display: "flex", alignItems: "center", gap: "10px", overflow: "hidden" }}>
        <CheckCircleOutlined className="task-column__done" style={{ color: done === "3" ? color.light_green : "#ededed" }} />
        <div className="text-ellipsis" style={{ textDecoration: done === "3" ? "line-through" : "" }}>
          {task.title}
        </div>
      </div>
      <div className="task-column__item task-column__assignees" style={{ display: "flex", justifyContent: "center" }}>
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
      <div className="task-column__item task-column__status task-column__status--active" style={{ backgroundColor: done === "3" ? color.light_green : "white" }}>
        {task.statusId === "5" ? (
          <div>
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
      <div className="task-column__item task-column__priority">
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
      <div className="task-column__item task-column__due-date">
        <TaskDate id={task.id} date={task.due_date} type="due_date" />
      </div>
      <div className="task-column__item task-column__timer">
        <Timer localstorage={task.id} disabled={task.statusId === "5" ? true : false} />
      </div>
      <div className="task-column__item task-column__more">
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
