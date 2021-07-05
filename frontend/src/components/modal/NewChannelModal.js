import React, { useState } from "react";
import { Modal, Button, Input, Form, Switch } from "antd";
import { createChannel } from "../../actions/channel";
import { connect } from "react-redux";

const NewChannelModal = (props) => {
  const [isPrivate, setPrivate] = useState(false);
  const [name, setName] = useState("");

  const onFinish = () => {
    props.createChannel({ projectId: props.projectId, name: name, isPrivate: isPrivate });
  };

  return (
    <Modal visible={props.visible} onCancel={props.handleCancel} footer={null} width="450px">
      <div style={{ padding: "15px 0", textAlign: "center" }}>
        <h2>Create new {isPrivate && "private"} channel</h2>
      </div>
      <Form onFinish={onFinish} onSubmit={onFinish}>
        <Form.Item name="name">
          <Input addonBefore="#" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item name="switcher">
          <Switch onChange={(e) => setPrivate(e)} />
        </Form.Item>
        <Form.Item>
          <Button onClick={onFinish}>Create</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(null, { createChannel })(NewChannelModal);
