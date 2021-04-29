import React, { useEffect } from "react";
import Toolbar from "../Toolbar";
import Container from "../../utils/Container";
import { Button, Card } from "antd";
import { InboxOutlined, AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../../../actions/project";

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

  if (props.projects) {
    content = (
      <div className="project-flex">
        {props.projects.map((project) => {
          return (
            <Card onClick={(e) => projectCardHandler(e, project.id)} key={project.id} className="project-card">
              {project.name}
            </Card>
          );
        })}
      </div>
    );
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

  return (
    <div>
      <Container size="30">
        <Toolbar>
          <div className="projects-dimension">
            <div className="projects-dimension__cards">
              <AppstoreOutlined />
            </div>
            <div className="projects-dimension__list">
              <MenuOutlined />
            </div>
          </div>
        </Toolbar>
        <div>{content}</div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
