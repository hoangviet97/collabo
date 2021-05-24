import React, { useState, useEffect } from "react";
import { CalendarOutlined, CheckCircleOutlined, MoreOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Typography, DatePicker } from "antd";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../../../actions/task";
import { Select } from "antd";
import TaskDateModal from "../../modal/TaskDateModdal";

const TaskItem = (props) => {
  const [datePicker, setDatePicker] = useState(null);
  const [done, setDone] = useState(props.status);
  const [datePosition, setDatePosition] = useState({ x: 0, y: 0 });

  const doneStyle = done === "3" ? { color: "green" } : { color: "#ededed" };
  const statusStyle = props.status === "Completed" ? { color: "white", backgroundColor: "#badc58" } : { color: "black", backgroundColor: "#dcdde1" };
  const due_date =
    props.due_date === null ? (
      <CalendarOutlined
        onClick={(e) => {
          openDateHandler(props.id);
          getE(e);
        }}
        className="task-calendar__icon"
      />
    ) : (
      <span
        onClick={(e) => {
          openDateHandler(props.id);
          getE(e);
        }}
      >
        <Moment format="D MMM YYYY">{props.due_date}</Moment>
      </span>
    );
  const { Text } = Typography;
  const { Option } = Select;

  const sectionMenu = () => (
    <Menu>
      <Menu.Item key="0">
        <span>Rename</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>Duplicate</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>Add to favorite</span>
      </Menu.Item>
      <Menu.Item key="3">
        <Text type="danger" onClick={deleteTaskHandler}>
          Delete
        </Text>
      </Menu.Item>
    </Menu>
  );

  const getE = (e) => {
    var elem = e.target;
    var rect = elem.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop;
    const absoluteY = scrollTop + rect.top;
    setDatePosition({ x: e.pageX, y: absoluteY });
    console.log(e.pageX);
  };

  const deleteTaskHandler = (event) => {
    event.stopPropagation();
    props.deleteTask({ id: props.id });
  };

  const openDateHandler = (id) => {
    setDatePicker(id);
  };

  const closeDateHandler = () => {
    setDatePicker(null);
  };

  const switchTaskStatusHandler = (value) => {
    console.log(value);
    setDone(value);
    props.updateTask({ id: props.id, statusId: value });
  };

  return (
    <div className="task-column" style={{ borderTop: "0.5px solid #dfe4ea" }}>
      <div className="task-column__item task-column__name" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CheckCircleOutlined className="task-column__done" style={{ color: done === "3" ? "green" : "#ededed" }} />
        <span>{props.name}</span>
      </div>
      <div className="task-column__item task-column__assignees">
        <Avatar.Group size={32} maxCount={2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Avatar style={{ backgroundColor: "#1890ff" }} />
        </Avatar.Group>
      </div>
      <div className="task-column__item task-column__status task-column__status--active">
        <Select className="status-select" defaultValue={props.status} onChange={switchTaskStatusHandler} showArrow={false} style={{ width: "100%" }} bordered={false}>
          <Option value="0">Open</Option>
          <Option value="1">In Progress</Option>
          <Option value="2">On Hold</Option>
          <Option value="3">Completed</Option>
          <Option value="4">Canceled</Option>
        </Select>
      </div>
      <div className="task-column__item task-column__priority">{props.priority}</div>
      <div className="task-column__item task-column__due-date">
        {due_date}
        <TaskDateModal show={datePicker} close={closeDateHandler} pos={datePosition} />
      </div>
      <div className="task-column__item task-column__more">
        <Dropdown onClick={() => console.log(props.id)} trigger={["click"]} overlay={sectionMenu} placement="bottomRight">
          <EllipsisOutlined style={{ fontSize: "22px" }} />
        </Dropdown>
      </div>
    </div>
  );
};

export default connect(null, { deleteTask, updateTask })(TaskItem);
