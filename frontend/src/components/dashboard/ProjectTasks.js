import React from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";

const ProjectTasks = (props) => {
  return (
    <div className="project-tasks">
      <Toolbar />
      <Container size="30">My tasks</Container>
    </div>
  );
};

export default ProjectTasks;
