import React, { useEffect } from "react";
import Toolbar from "./Toolbar";
import Container from "../utils/Container";
import { getProject } from "../../actions/project";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Skeleton } from "antd";

const ProjectTasks = (props) => {
  useEffect(() => {
    props.getProject(props.match.params.id);
  }, []);

  return (
    <div className="project-tasks">
      <Toolbar />
      <Container size="30">Tasks</Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps, { getProject })(withRouter(ProjectTasks));
