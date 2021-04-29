import React from "react";
import { CalendarOutlined, CheckCircleOutlined, MoreOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import Moment from "react-moment";

const TaskItem = (props) => {
  const doneStyle = props.status === "Open" ? { color: "green" } : { color: "#ededed" };
  const due_date = props.due_date === null ? <CalendarOutlined className="task-calendar__icon" /> : props.due_date;

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
      <div className="task-column__item task-column__status">{props.status}</div>
      <div className="task-column__item task-column__priority">{props.priority}</div>
      <div className="task-column__item task-column__due-date">
        <Moment format="D MMM YYYY">{due_date}</Moment>
      </div>
      <div className="task-column__item task-column__more">
        <MoreOutlined style={{ fontSize: "22px", position: "relative", left: "35px" }} />
      </div>
    </div>
  );
};

export default TaskItem;
