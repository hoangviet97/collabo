import React from "react";
import { connect } from "react-redux";
import { Breadcrumb, Button, Modal } from "antd";

const TaskDetailModal = (props) => {
  return (
    <Modal width="90%" className="mod" visible={props.isVisible}>
      <div></div>
    </Modal>
  );
};

export default TaskDetailModal;
