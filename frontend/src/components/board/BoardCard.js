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
      <div className="board-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="board-card-title">{title}</h3>
        <Popconfirm title="Are you sure to delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
          <button>
            <CloseOutlined />
          </button>
        </Popconfirm>
      </div>
      <div className="board-card-description">{description !== null ? description : <span style={{ color: "#bdc3c7" }}>No description</span>}</div>
      <div className="board-card-footer" style={{ display: "flex", justifyContent: "space-between" }}>
        <Tag color={priorityColor}>{priority}</Tag>
        <div className="board-card-">{due_date === null ? "" : <span style={{ fontSize: "12px", color: dayColor }}>{moment(due_date).diff(moment(), "days") > 0 ? "days left" : `${moment(due_date).diff(moment(), "days") * -1} days behind`}</span>}</div>
      </div>
    </div>
  );
};

export default BoardCard;
