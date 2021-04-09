import React from "react";
import Toolbar from "../Toolbar";
import Container from "../../utils/Container";
import { Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const Tasks = () => {
  let content = (
    <div className="no-content">
      <InboxOutlined style={{ fontSize: "50px", color: "grey" }} />
      <h2>There're no tasks for you</h2>
      <Button type="primary">Create your first task</Button>
    </div>
  );

  return (
    <div>
      <Toolbar />
      <Container size="30">{content}</Container>
    </div>
  );
};

export default Tasks;
