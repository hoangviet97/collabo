import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { showTaskModal } from "../../actions/modal";
import { ClockCircleOutlined } from "@ant-design/icons";

interface Props {
  showTaskModal: any;
}

const Toolbox: React.FC<Props> = ({ showTaskModal }) => {
  const taskModalHandler = () => {
    showTaskModal();
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

export default connect(null, { showTaskModal })(Toolbox);
