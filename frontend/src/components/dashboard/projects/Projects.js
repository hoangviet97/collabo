import React, { useEffect, useState } from "react";
import Toolbar from "../Toolbar";
import Container from "../../utils/Container";
import Project from "./Project";
import { Button, Skeleton } from "antd";
import { InboxOutlined, AppstoreOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useHistory, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProjects } from "../../../actions/project";
import Spinner from "../../utils/Spinner";

const Projects = (props) => {
  useEffect(() => {
    props.getProjects();
  }, []);

  const history = useHistory();
  const [projectsDimension, setProjectsDimension] = useState("cards");
  const [activeCards, setActiveCards] = useState("projects-dimension__cards--active");
  const [activeList, setActiveList] = useState("");

  const projectCardHandler = (index) => {
    console.log("test");
    const path = "/" + index + "/tasks";
    history.push(path);
  };

  const setList = () => {
    setProjectsDimension("list");
    setActiveList("projects-dimension__list--active");
    setActiveCards("");
  };

  const setCards = () => {
    setProjectsDimension("cards");
    setActiveCards("projects-dimension__cards--active");
    setActiveList("");
  };

  let content;

  if (props.loading) {
    content = <Skeleton />;
  } else if (props.projects) {
    content = (
      <div className={`projects-dimension-${projectsDimension}`}>
        {props.projects.map((project) => {
          return <Project projectCardHandler={projectCardHandler} key={project.id} project={project} />;
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
          <div className="new-project-container">
            <Link to="/projects/new">
              <Button type="primary">
                <PlusOutlined />
                New Project
              </Button>
            </Link>
          </div>
          <div className="projects-dimension">
            <div className={`projects-dimension__cards ${activeCards}`} onClick={setCards}>
              <AppstoreOutlined />
            </div>
            <div className={`projects-dimension__list ${activeList}`} onClick={setList}>
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
  auth: state.auth,
  loading: state.project.loading
});

export default connect(mapStateToProps, { getProjects })(withRouter(Projects));
