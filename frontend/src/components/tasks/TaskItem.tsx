import React, { useState, useEffect, FC } from "react";
import { CalendarOutlined, CheckCircleOutlined, EllipsisOutlined, CopyOutlined, FormOutlined, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Typography, DatePicker, Tag, Popover } from "antd";
import Moment from "react-moment";
import { connect, useDispatch } from "react-redux";
import { deleteTask, updateTaskStatus, updateTaskPriority } from "../../actions/task";
import { Select } from "antd";
import TaskDateModal from "../modal/TaskDateModdal";
import StatusIcon from "../utils/StatusIcon";
import AvatarIcon from "../utils/AvatarIcon";
import Timer from "../timeTracker/Timer";
import { EditOutlined, UserAddOutlined } from "@ant-design/icons";
import AssigneesModal from "../modal/AssigneesModal";

interface Props {
  showModal: any;
  closeModal: any;
  projectId: string;
  sectionName: string;
  assignees: any;
  members: any;
  task: any;
  start_date: any;
}

const TaskItem: FC<Props> = ({ showModal, closeModal, projectId, sectionName, assignees, members, task, start_date }) => {
  const dispatch = useDispatch();
  const [datePicker, setDatePicker] = useState<any | null>(null);
  const [done, setDone] = useState(task.statusId);
  const [datePosition, setDatePosition] = useState({ x: 0, y: 0 });
  const [assignessModalVisible, setAssignessModalVisible] = useState<boolean>(false);

  const due_date =
    task.due_date === null ? (
      <CalendarOutlined
        onClick={(e) => {
          openDateHandler(task.id);
          getE(e);
        }}
        className="task-calendar__icon"
      />
    ) : (
      <span
        onClick={(e) => {
          openDateHandler(task.id);
          getE(e);
        }}
      >
        <Moment format="D MMM YYYY">{task.due_date}</Moment>
      </span>
    );
  const { Text } = Typography;
  const { Option } = Select;

  const sectionMenu = () => (
    <Menu>
      <Menu.Item key="0">
        <span>
          <FormOutlined />
          Rename
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>
          <CopyOutlined />
          Duplicate
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <StarOutlined />
          Add to favorite
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

  const getE = (e: any) => {
    var elem = e.target;
    var rect = elem.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop;
    const absoluteY = scrollTop + rect.top;
    setDatePosition({ x: e.pageX, y: absoluteY });
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTask({ id: task.id, project_id: projectId }));
  };

  const openDateHandler = (id: any) => {
    setDatePicker(id);
  };

  const closeDateHandler = () => {
    setDatePicker(null);
  };

  const switchTaskStatusHandler = (value: any) => {
    setDone(value);
    dispatch(updateTaskStatus({ id: task.id, statusId: value, project_id: projectId }));
  };

  const switchPriorityHandler = (value: any) => {
    dispatch(updateTaskPriority({ id: task.id, priorityId: value, project_id: projectId }));
  };

  const showAssigness = () => {
    setAssignessModalVisible(true);
  };

  const closeAssigness = () => {
    setAssignessModalVisible(false);
  };

  return (
    <div className="task-column">
      <div onClick={() => showModal(task, sectionName)} className="task-column__item task-column__name" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CheckCircleOutlined className="task-column__done" style={{ color: done === "3" ? "#6ab04c" : "#ededed" }} />
        <span>{task.title}</span>
      </div>
      <div className="task-column__item task-column__assignees" style={{ display: "flex", justifyContent: "center" }}>
        {assignees.length > 0 ? (
          <>
            <Avatar.Group size={32} maxCount={1} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              {assignees.map((assignee: any, index: number) => (
                <Popover key={index} content={assignee.firstname}>
                  <Avatar key={index} style={{ backgroundColor: "#1890ff" }}>
                    <AvatarIcon name={assignee.firstname} />
                  </Avatar>
                </Popover>
              ))}
            </Avatar.Group>
            <div onClick={showAssigness} style={{ position: "absolute", width: "20px", height: "20px", marginTop: "-23px", borderRadius: "50%", marginLeft: assignees.length < 2 ? "47px" : "70px", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <EditOutlined style={{ fontSize: "10px", color: "#bdc3c7" }} />
            </div>
          </>
        ) : (
          <div onClick={showAssigness} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserAddOutlined style={{ fontSize: "20px", color: "#bdc3c7" }} />
          </div>
        )}
        {assignessModalVisible && <AssigneesModal task_id={task.id} assignees={assignees} members={members} close={closeAssigness} project={projectId} />}
      </div>
      <div className="task-column__item task-column__status task-column__status--active">
        <Select className="task-select" defaultValue={task.statusId} onChange={switchTaskStatusHandler} showArrow={false} style={{ width: "100%" }} bordered={false}>
          <Option value="0">Open</Option>
          <Option value="1">In Progress</Option>
          <Option value="2">On Hold</Option>
          <Option value="3">Completed</Option>
          <Option value="4">Canceled</Option>
        </Select>
      </div>
      <div className="task-column__item task-column__priority" style={{ color: "grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Select className="task-select" defaultValue={task.priorityId} onChange={switchPriorityHandler} showArrow={false} style={{ width: "100%" }} bordered={false}>
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
        {due_date}
        <TaskDateModal taskId={task.id} start_date={task.start_date} due_date={task.due_date} show={datePicker} close={closeDateHandler} pos={datePosition} />
      </div>
      <div className="task-column__item task-column__timer">
        <Timer localstorage={task.id} project_id={projectId} />
      </div>
      <div className="task-column__item task-column__more">
        <Dropdown trigger={["click"]} overlay={sectionMenu} placement="bottomRight">
          <EllipsisOutlined style={{ fontSize: "22px" }} />
        </Dropdown>
      </div>
    </div>
  );
};

export default TaskItem;
