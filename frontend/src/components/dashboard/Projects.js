import React from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";
import { Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Projects = () => {
  let content = (
    <div className="no-content">
      <InboxOutlined style={{ fontSize: "50px", color: "grey" }} />
      <h2>There're no project for you</h2>
      <Button type="primary">
        <Link to="/projects/new">Create your first project</Link>
      </Button>
    </div>
  );

  return (
    <div>
      <Toolbar />
      <Container size="30">{content}</Container>
    </div>
  );
};

export default Projects;
