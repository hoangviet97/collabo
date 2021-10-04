import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { showTaskModal } from "../../actions/modal";
import { ClockCircleOutlined } from "@ant-design/icons";

const Toolbox: React.FC = () => {
  const dispatch = useDispatch();

  const taskModalHandler = () => {
    dispatch(showTaskModal());
    //upravit na localni modal
  };

  return (
    <div className="toolbox">
      <Button type="primary" onClick={taskModalHandler}>
        + Task
      </Button>
      <Button type="default" style={{ display: "flex", alignItems: "center" }}>
        <ClockCircleOutlined style={{ fontSize: "18px" }} />
      </Button>
    </div>
  );
};

export default Toolbox;
