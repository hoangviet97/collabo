import React, { useState } from "react";
import { Modal, Button, Input, Form, Switch } from "antd";

const MessageEditor = ({ visible, handleCancel, handleOk }) => {
  const { TextArea } = Input;
  const [value, setValue] = useState("");

  return (
    <Modal visible={visible} onCancel={handleCancel} onOk={handleOk} width="60%">
      <div style={{ padding: "30px 15px" }}>
        <TextArea style={{ fontSize: "20px" }} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Controlled autosize" autoSize={{ minRows: 5, maxRows: 8 }} />
      </div>
    </Modal>
  );
};

export default MessageEditor;
