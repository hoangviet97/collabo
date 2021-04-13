import React, { useState } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { showTaskModal, closeTaskModal } from "../../actions/modal";

const TaskModal = (props) => {
  const handleOk = () => {
    props.closeTaskModal();
  };

  const handleCancel = () => {
    props.closeTaskModal();
  };

  return (
    <div className="modal">
      <Modal title="Basic Modal" visible={props.isVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isVisible: state.modal.taskModal
});

export default connect(mapStateToProps, { showTaskModal, closeTaskModal })(TaskModal);
