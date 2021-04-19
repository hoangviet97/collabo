import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { showTaskModal } from "../../actions/modal";
import { getProjects } from "../../actions/project";

const Toolbox = (props) => {
  const taskModalHandler = () => {
    props.showTaskModal();
    props.getProjects();
  };

  return (
    <div className="toolbox">
      <Button type="primary" onClick={taskModalHandler}>
        + Task
      </Button>
    </div>
  );
};

export default connect(null, { showTaskModal, getProjects })(Toolbox);
