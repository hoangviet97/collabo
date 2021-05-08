import React from "react";
import { Input, Form, Button, Col, Row } from "antd";

const InviteModal = () => {
  return (
    <div className="invite-modal">
      <Form style={{ width: "40%", display: "flex", gap: "10px" }}>
        <Input type="email" placeholder="Enter e-mail address" />
        <Button type="primary">Invite</Button>
      </Form>
    </div>
  );
};

export default InviteModal;
