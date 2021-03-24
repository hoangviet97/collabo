import React from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";
import { Button } from "antd";

import { FolderOpenOutlined } from "@ant-design/icons";

const Projects = () => {
  let content = (
    <>
      <div className="no-project">
        <FolderOpenOutlined style={{ fontSize: "40px", marginBottom: "25px" }} />
        <h2>There're no projects for you</h2>
        <Button type="primary" shape="round" size={30}>
          Create your first project
        </Button>
      </div>
    </>
  );

  return (
    <div>
      <Toolbar />
      <Container size="30">{content}</Container>
    </div>
  );
};

export default Projects;
