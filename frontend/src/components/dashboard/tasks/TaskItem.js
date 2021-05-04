import React, { useState, useEffect } from "react";
import { CalendarOutlined, CheckCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu, Typography } from "antd";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteTask } from "../../../actions/task";

const TaskItem = (props) => {
  const doneStyle = props.status === "Completed" ? { color: "green" } : { color: "#ededed" };
  const due_date = props.due_date === null ? <CalendarOutlined className="task-calendar__icon" /> : <Moment format="D MMM YYYY">{props.due_date}</Moment>;
  const { Text } = Typography;

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

  const deleteTaskHandler = (event) => {
    event.stopPropagation();
    props.deleteTask({ id: props.id });
  };

  return (
    <div className="task-column">
      <div className="task-column__item task-column__name" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CheckCircleOutlined className="task-column__done" style={doneStyle} />
        <span>{props.name}</span>
      </div>
      <div className="task-column__item task-column__assignees">
        <Avatar.Group size={32} maxCount={2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
          <Avatar style={{ backgroundColor: "#1890ff" }} />
        </Avatar.Group>
      </div>
      <div className="task-column__item task-column__status" contentEditable>
        {props.status}
      </div>
      <div className="task-column__item task-column__priority">{props.priority}</div>
      <div className="task-column__item task-column__due-date">{due_date}</div>
      <div className="task-column__item task-column__more">
        <Dropdown onClick={() => console.log(props.id)} trigger={["click"]} overlay={sectionMenu} placement="bottomRight">
          <MoreOutlined style={{ fontSize: "22px", position: "relative", left: "35px" }} />
        </Dropdown>
      </div>
    </div>
  );
};

export default connect(null, { deleteTask })(TaskItem);
