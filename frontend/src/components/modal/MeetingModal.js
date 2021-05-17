import React, { useState } from "react";
import { Modal, Button } from "antd";

const MeetingModal = (props) => {
  return (
    <Modal title="Basic Modal" width="50%" visible={props.visible} onOk={props.handleOk} onCancel={props.handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default MeetingModal;
