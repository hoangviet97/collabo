import React, { useState, useEffect, FC } from "react";
import { Tag, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteTask } from "../../redux/actions/task";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  description: string;
  priority: string;
  due_date: string;
  dragging: () => void;
  showModalHandler: () => void;
}

const BoardCard: React.FunctionComponent<Props> = ({ id, title, description, priority, due_date, dragging, showModalHandler }) => {
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const [priorityColor, setPriorityColor] = useState<string>("");
  const [dayColor, setDayColor] = useState<string>("black");
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
    //dispatch(deleteTask(id));
  };

  return (
    <div className="board__card" onClick={showModalHandler} data-dragging={dragging}>
      <div className="board__card-header">
        <h3 className="board__card-title">{title}</h3>
        <Popconfirm title="Are you sure to delete this task?" onConfirm={confirm} okText="Yes" cancelText="No">
          <button style={{ border: "none", backgroundColor: "transparent" }}>
            <CloseOutlined />
          </button>
        </Popconfirm>
      </div>
      <div className="board__card-description">{description !== null ? description : <span style={{ color: "#bdc3c7" }}>No description</span>}</div>
      <div className="board__card-footer">
        <Tag color={priorityColor}>{priority}</Tag>
        <div className="board-card-">{due_date === null ? "" : moment(due_date).diff(moment(), "days") > 0 ? <span style={{ color: "green" }}>{`${moment(due_date).diff(moment(), "days")} days left`}</span> : <span style={{ color: "red" }}>{`${moment(due_date).diff(moment(), "days") * -1} days behind`}</span>}</div>
      </div>
    </div>
  );
};

export default BoardCard;
