import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import Project from "./Project";
import { Button, Skeleton, Select } from "antd";
import { InboxOutlined, AppstoreOutlined, MenuOutlined, PlusOutlined, StarFilled, CloseOutlined } from "@ant-design/icons";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getProjects, goToProject } from "../../actions/project";
import { getMembers2 } from "../../actions/member";
import "./Project.scss";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootStateOrAny) => state.project.projects);
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const loading = useSelector((state: RootStateOrAny) => state.project.loading);

  const history = useHistory();
  const { Option } = Select;
  const [projectsDimension, setProjectsDimension] = useState<string>("cards");
  const [activeCards, setActiveCards] = useState<string>("projects-dimension__cards--active");
  const [activeList, setActiveList] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isFvorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getMembers2());
  }, []);

  useEffect(() => {
    setFilteredData(projects);
  }, [projects]);

  const projectCardHandler = (index: string) => {
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

  function handleChange(value: string) {
    if (value === "newest") {
      const data = [...projects].sort((a, b) => (new Date(a.created_at) < new Date(b.created_at) ? 1 : -1));
      setFilteredData(data);
    } else if (value === "oldest") {
      const data = [...projects].sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? 1 : -1));
      setFilteredData(data);
    }
  }

  const showFavorite = () => {
    setIsFavorite(true);
    const data = projects.filter((item: any) => item.favorite === 1);
    setFilteredData(data);
  };

  const showAll = () => {
    setIsFavorite(false);
    const data = projects.filter((item: any) => item.favorite === 0 || item.favorite === 1);
    setFilteredData(data);
  };

  //kotva

  let content;

  if (loading) {
    content = <Skeleton />;
  } else if (projects) {
    content = (
      <div className={`projects-dimension-${projectsDimension}`}>
        {filteredData.map((project) => {
          let membersArr = members.filter((x: any) => x.project_id === project.id);
          return <Project projectCardHandler={projectCardHandler} key={project.id} project={project} members={membersArr} />;
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
            <div className="projects__favorite-filter">
              {!isFvorite ? (
                <Button onClick={showFavorite} style={{ borderRadius: "10px" }}>
                  <StarFilled />
                </Button>
              ) : (
                <Button onClick={showAll} style={{ borderRadius: "10px" }}>
                  <CloseOutlined />
                </Button>
              )}
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

export default withRouter(Projects);
