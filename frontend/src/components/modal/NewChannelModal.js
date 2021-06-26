import React from "react";
import { Modal, Button, Input, Form, Switch } from "antd";

const NewChannelModal = (props) => {
  return (
    <Modal visible={props.visible} onOk={props.handleOk} onCancel={props.handleCancel} width="450px">
      <div style={{ padding: "15px 0", textAlign: "center" }}>
        <h2>Create new channel</h2>
      </div>
      <Form>
        <Form.Item>
          <Input />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Private channel</strong>
            <Switch />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewChannelModal;
