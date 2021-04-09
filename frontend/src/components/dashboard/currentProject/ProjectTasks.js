import React from "react";
import Toolbar from "../Toolbar";
import Container from "../../utils/Container";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ProjectTasks = () => {
  return (
    <div className="project-tasks">
      <Toolbar />
      <Container size="30">
        <div className="new-section">
          <Input style={{ marginBottom: "10px" }} placeholder="Place your section name" />
          <Button type="dashed">
            <PlusOutlined /> Section
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProjectTasks;
