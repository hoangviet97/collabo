import React, { useEffect, useState } from "react";
import Container from "../../components/utils/Container";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { Button, Skeleton, Select } from "antd";
import { AppstoreOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getProjects } from "../../redux/actions/project";
import { getMembers2 } from "../../redux/actions/member";
import "../../components/projectCard/Project.scss";
import { project, member } from "../../types/types";

const ProjectsPage: React.FunctionComponent = () => {
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

  let content;

  if (loading) {
    content = <Skeleton />;
  } else if (projects) {
    content = (
      <div className={`projects-dimension-${projectsDimension}`}>
        {filteredData.map((project: project, index: number) => {
          let membersArr = members.filter((x: member) => x.project_id === project.id);
          return <ProjectCard projectCardHandler={projectCardHandler} key={project.id} project={project} members={membersArr} />;
        })}
      </div>
    );
  }

  return (
    <div>
      <Container size="50">
        <div className="projects__toolbar">
          <div className="new-project-container">
            <Link to="/projects/new">
              <Button type="primary">
                <PlusOutlined />
                New Project
              </Button>
            </Link>
          </div>
          <div className="projects__toolbar-right">
            <div className="projects__sort" style={{ marginRight: "10px" }}>
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

export default withRouter(ProjectsPage);
