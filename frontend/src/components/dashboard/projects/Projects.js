import React, { useEffect } from "react";
import Toolbar from "../Toolbar";
import Container from "../../utils/Container";
import { Button, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../../../actions/project";
import Spinner from "../../utils/Spinner";

const Projects = (props) => {
  useEffect(() => {
    props.getProjects();
  }, []);

  const history = useHistory();

  const projectCardHandler = (e, index) => {
    e.preventDefault();
    const path = "/" + index + "/tasks";
    history.push(path);
  };

  let content;

  if (props.loading === true) {
    content = <Spinner />;
  } else {
    if (props.projects > 0 || props.projects !== null) {
      content = props.projects.map((project) => {
        return (
          <Card onClick={(e) => projectCardHandler(e, project.id)} key={project.id} className="project-card">
            {project.name}
          </Card>
        );
      });
    } else {
      content = (
        <div className="no-content">
          <InboxOutlined style={{ fontSize: "50px", color: "grey" }} />
          <h2>There're no project for you</h2>
          <Button type="primary">
            <Link to="/projects/new">Create your first project</Link>
          </Button>
        </div>
      );
    }
  }

  return (
    <div>
      <Toolbar />
      <Container size="30">
        <div class="project-list">{content}</div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
  auth: state.auth,
  loading: state.project.loading
});

export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
