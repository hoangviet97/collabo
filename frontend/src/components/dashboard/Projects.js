import React from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";
import NoContent from "./noContent/NoContent";

const Projects = () => {
  let content = <NoContent type="project" />;

  return (
    <div>
      <Toolbar />
      <Container size="30">{content}</Container>
    </div>
  );
};

export default Projects;
