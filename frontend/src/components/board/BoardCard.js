import React, { useState, useEffect, FC } from "react";
import { Tag, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteTask } from "../../actions/task";
import { useDispatch } from "react-redux";

const BoardCard = ({ id, title, description, priority, due_date, dragging, showModalHandler }) => {
  const dispatch = useDispatch();
  const [priorityColor, setPriorityColor] = useState("");
  const [dayColor, setDayColor] = useState("black");
  const today = new Date();

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

  const confirm = () => {
    dispatch(deleteTask({ id: id }));
  };

  const cancel = () => {};

  return (
    <div className="board-card" onClick={showModalHandler} style={{ backgroundColor: "white", padding: "15px", margin: "5px", width: "290px", borderRadius: "10px" }} dragging={dragging}>
      <div className="board-card-header">
        <h3 className="board-card-title">{title}</h3>
      </div>
      <div className="board-card-description">{description !== null ? description : <span style={{ color: "#bdc3c7" }}>No description</span>}</div>
      <div className="board-card-footer" style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Tag color={priorityColor}>{priority}</Tag>
        <div className="board-card-">{due_date === null ? "" : moment(due_date).diff(moment(), "days") > 0 ? <span style={{ color: "green" }}>{`${moment(due_date).diff(moment(), "days")} days left`}</span> : <span style={{ color: "red" }}>{`${moment(due_date).diff(moment(), "days") * -1} days behind`}</span>}</div>
      </div>
    </div>
  );
};

export default BoardCard;
