import React, { useState, useEffect } from "react";
import { Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";

const BoardCard = ({ title, description, priority, due_date, dragging, openTask }) => {
  const [priorityColor, setPriorityColor] = useState("");
  const [dayColor, setDayColor] = useState("black");

  useEffect(() => {
    switch (priority) {
      case "Low":
        setPriorityColor("gold");
        break;
      case "Medium":
        setPriorityColor("green");
        break;
      case "High":
        setPriorityColor("red");
        break;
      default:
        setPriorityColor("white");
    }
  }, [priority]);

  useEffect(() => {
    const day = moment(due_date).diff(moment(), "days");
    if (day < 6) {
      setDayColor("red");
    } else {
      setDayColor("green");
    }
  }, [due_date]);

  return (
    <div className="board-card" onClick={() => openTask} style={{ backgroundColor: "white", padding: "15px", margin: "5px", width: "290px", borderRadius: "10px" }} dragging={dragging}>
      <div className="board-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="board-card-title">{title}</h3>
        <button>
          <CloseOutlined />
        </button>
      </div>
      <div className="board-card-description">{description !== null ? description : <span style={{ color: "#bdc3c7" }}>No description</span>}</div>
      <div className="board-card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
        <Tag color={priorityColor}>{priority}</Tag>
        <div className="board-card-">{due_date === null ? "" : <span style={{ fontSize: "12px", color: dayColor }}>{moment(due_date).diff(moment(), "days")} days left</span>}</div>
      </div>
    </div>
  );
};

export default BoardCard;
