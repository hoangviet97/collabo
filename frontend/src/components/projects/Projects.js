import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import Project from "./Project";
import { Button, Skeleton, Select } from "antd";
import { InboxOutlined, AppstoreOutlined, MenuOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import { Link, useHistory, withRouter } from "react-router-dom";
import { connect, useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getProjects } from "../../actions/project";
import socket from "../../service/socket";

const Projects = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    setFilteredData(props.projects);
  }, [props.projects]);

  const history = useHistory();
  const { Option } = Select;
  const [projectsDimension, setProjectsDimension] = useState("cards");
  const [activeCards, setActiveCards] = useState("projects-dimension__cards--active");
  const [activeList, setActiveList] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  function handleChange(value) {
    if (value === "newest") {
      const data = [...props.projects].sort((a, b) => (new Date(a.created_at) < new Date(b.created_at) ? 1 : -1));
      setFilteredData(data);
    } else if (value === "oldest") {
      const data = [...props.projects].sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? 1 : -1));
      setFilteredData(data);
    }
  }

  const showFavorite = () => {
    const data = props.projects.filter((item) => item.favorite === 1);
    setFilteredData(data);
  };

  //kotva

  let content;

  if (props.loading) {
    content = <Skeleton />;
  } else if (props.projects) {
    content = (
      <div className={`projects-dimension-${projectsDimension}`}>
        {filteredData.map((project) => {
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
        <div className="projects-toolbar" style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div className="new-project-container">
            <Link to="/projects/new">
              <Button type="primary">
                <PlusOutlined />
                New Project
              </Button>
            </Link>
          </div>
          <div className="projects-toolbar__right-side" style={{ display: "flex", gap: "15px" }}>
            <div class="projects__favorite-filter">
              <Button onClick={showFavorite} style={{ borderRadius: "10px" }}>
                <StarFilled />
              </Button>
            </div>
            <div className="projects__sort">
              <Select style={{ width: 150, borderRadius: "10px" }} onChange={handleChange}>
                <Option value="newest">Newest</Option>
                <Option value="oldest">Oldest</Option>
              </Select>
            </div>
            <div className="projects-dimension">
              <div className={`projects-dimension__cards ${activeCards}`} onClick={setCards}>
                <AppstoreOutlined />
              </div>
              <div className={`projects-dimension__list ${activeList}`} onClick={setList}>
                <MenuOutlined />
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, {})(withRouter(Projects));
