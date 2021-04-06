import React, { useEffect } from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";
import { connect } from "react-redux";
import { getProject } from "../../actions/project";
import { withRouter } from "react-router-dom";

const ProjectTasks = (props) => {
  let path = window.location.pathname;
  let val = path.split("/")[1];

  useEffect(() => {
    props.getProject(val);
  }, []);

  return (
    <div className="project-tasks">
      <Toolbar />
      <Container size="30"></Container>
    </div>
  );
};

export default withRouter(connect(null, { getProject })(ProjectTasks));
