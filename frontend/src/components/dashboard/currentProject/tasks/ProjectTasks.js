import React, { useEffect, useState } from "react";
import Toolbar from "../../Toolbar";
import Container from "../../../utils/Container";
import { getProject } from "../../../../actions/project";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TaskModal from "../../../modal/TaskModal";

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
