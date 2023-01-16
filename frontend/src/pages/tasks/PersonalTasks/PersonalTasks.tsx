import React, { useState, useEffect, FC } from "react";
import Container from "../../../components/utils/Container";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Collapse, Input, Button, Dropdown, Menu, Typography, Select, Divider, Skeleton } from "antd";
import { EllipsisOutlined, PlusOutlined, AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import { section, tag, task } from "../../../types/types";
import TaskItem from "../../../components/taskItem/TaskItem";
import TaskCard from "../../../components/taskItem/TaskCard";
import { createSection, getSections, deleteSection, resetSections } from "../../../redux/actions/section";
import { getPersonalTasks, createTask, getAllAssignees, resetTasks } from "../../../redux/actions/task";
import { getTagsByTasks, getTags, resetTags } from "../../../redux/actions/tag";
import { resetProject } from "../../../redux/actions/project";
import { getMembers } from "../../../redux/actions/member";
import { getProjects } from "../../../redux/actions/project";
import TaskDetailModal2 from "../../../components/modal/TaskDetailModal2";

interface Props {
  match: any;
}

const PersonalTasks: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootStateOrAny) => state.project.projects);
  const sections = useSelector((state: RootStateOrAny) => state.section.sections);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const sectionLoading = useSelector((state: RootStateOrAny) => state.section.loading);
  const loading = useSelector((state: RootStateOrAny) => state.task.loading);
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const assignees = useSelector((state: RootStateOrAny) => state.task.assignees);
  const tags = useSelector((state: RootStateOrAny) => state.tag.taskTags);
  const allTags = useSelector((state: RootStateOrAny) => state.tag.tags);
  const auth = useSelector((state: RootStateOrAny) => state.auth.user);

  const [taskVisual, setTaskVisual] = useState<string | null>("");
  const [taskContainer, setTaskContainer] = useState([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [taskNameForSearch, setTaskNameForSearch] = useState<string>("");
  const [newTaskIndexes, setNewTaskIndexes] = useState<any>([]);
  const [newSection, setNewSection] = useState<string>("");
  const [newTask, setNewTask] = useState<string>("");
  const [newSectionVisibility, setNewSectionVisibility] = useState<boolean>(false);
  const [selectedVal, setSelectedVal] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [taskDetail, setTaskDetail] = useState({});
  const [filteredAssignees, setFilteredAssignees] = useState([]);
  const [selectedSection, setSelectedSection] = useState<string>("");

  const { Panel } = Collapse;
  const { Text } = Typography;
  const { Option } = Select;

  const getData = (id: string) => {
    dispatch(getSections(id));
    dispatch(getMembers(id));
    dispatch(getAllAssignees(id));
    dispatch(getPersonalTasks(id, auth.id));
    dispatch(getTagsByTasks(id));
    dispatch(getTags(id));
  };

  useEffect(() => {
    if (localStorage.getItem("task_visual") === null) {
      localStorage.setItem("task_visual", "list");
    } else {
      setTaskVisual(localStorage.getItem("task_visual"));
    }
    dispatch(getProjects());

    return () => {
      dispatch(resetProject());
      dispatch(resetTasks());
      dispatch(resetSections());
      dispatch(resetTags());
    };
  }, []);

  useEffect(() => {
    if (match.params.taskId !== undefined) {
      showModal();
    }
  }, [match.params.taskId]);

  useEffect(() => {
    getData(selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    setTaskContainer(tasks);
  }, [tasks]);

  const panelHeader = (name: string, id: string) => (
    <React.Fragment>
      <div className="panel-header">
        <span className="panel-header__title" style={{ fontSize: "20px" }}>
          {name}
        </span>
        <Dropdown className="panel-dropdown" overlay={sectionMenu} trigger={["hover"]}>
          <a
            style={{ padding: "0px" }}
            type="link"
            onClick={(event) => {
              setSelectedSection(id);
              console.log(id);
              event.stopPropagation();
            }}
          >
            <EllipsisOutlined />
          </a>
        </Dropdown>
      </div>
    </React.Fragment>
  );

  const sectionMenu = () => (
    <Menu>
      <Menu.Item key="0">
        <Text>Rename</Text>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={(event) => {
          dispatch(deleteSection(selectedProject, selectedSection));
        }}
      >
        <Text type="danger">Delete</Text>
      </Menu.Item>
    </Menu>
  );

  const setVisualHandler = (value: string) => {
    setTaskVisual(value);
    localStorage.setItem("task_visual", value);
  };

  const sectionVisibilityHandler = () => {
    setNewSectionVisibility(true);
  };

  const onBlurSectionHandler = () => {
    setNewSectionVisibility(false);

    if (newSection.length === 0) {
      console.log("empty");
    } else {
      dispatch(createSection(selectedProject, newSection));
      setNewSection("");
    }
  };

  const onBlurTaskHandler = (sectionId: string, index: number) => {
    setNewTaskIndexes({ [index]: false });

    const values = {
      sectionId: sectionId,
      priorityId: "0",
      statusId: "0",
      title: newTask,
      description: null,
      start_date: null,
      due_date: null,
      assigneesArray: []
    };

    if (newTask.length > 0) {
      dispatch(createTask(selectedProject, values));
      setNewTask("");
      setSelectedVal([]);
    }
  };

  const taskHandler = (e: any) => {
    setNewTask(e.target.value);
  };

  const sectionHandler = (e: any) => {
    setNewSection(e.target.value);
  };

  const newTaskVisibilityHandler = (index: any) => {
    setNewTaskIndexes({ [index]: true });
  };

  const closeModal = (project?: string) => {
    project && getData(project);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const projectSelectHandler = (value: string) => {
    setSelectedProject(value);
    getData(value);
  };

  return (
    <div className="project-tasks">
      {loading ? (
        <Skeleton />
      ) : (
        <Container size="50">
          <header style={{ backgroundColor: "white", padding: "20px 15px", marginBottom: "50px", borderRadius: "10px" }}>
            <h1>My Tasks</h1>
            <div>
              <Select style={{ width: "40%" }} placeholder="Select your project" onChange={projectSelectHandler}>
                {projects.map((item: any) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </div>
          </header>
          {selectedProject.length > 0 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 15px" }}>
                <Input value={taskNameForSearch} onChange={(e) => setTaskNameForSearch(e.target.value)} placeholder="Search tasks by name" style={{ width: "40%" }} />
                <div>
                  <Button onClick={() => setVisualHandler("card")}>
                    <AppstoreOutlined />
                  </Button>
                  <Button onClick={() => setVisualHandler("list")}>
                    <MenuOutlined />
                  </Button>
                </div>
              </div>
              <Divider />
              <Collapse className="task__collapse" collapsible="header" defaultActiveKey={["1"]} ghost>
                {sections.map((section: section, index: number) => (
                  <Panel className="task__panel" key={section.id} header={panelHeader(section.name, section.id)}>
                    <div className={`task__visual-${taskVisual}`}>
                      {taskContainer
                        .filter((x: task) => {
                          return x.title.toLowerCase().includes(taskNameForSearch.toLocaleLowerCase());
                        })
                        .map((task: task, i: number) => {
                          if (section.id === task.sections_id) {
                            const assigneesArray = assignees.filter((i: any) => i.tasks_id === task.id);
                            if (taskVisual === "list") {
                              return <TaskItem showModal={showModal} closeModal={closeModal} key={i} assignees={assigneesArray} members={members} task={task} start_date={task.start_date} match={match} />;
                            } else if (taskVisual === "card") {
                              return <TaskCard key={i} task={task} sectionName={section.name} showModal={showModal} closeModal={closeModal} assignees={assigneesArray} members={members} />;
                            }
                          }
                        })}
                    </div>
                    <div style={{ marginTop: "15px" }}>
                      {newTaskIndexes[index] === true ? (
                        <form onSubmit={() => onBlurTaskHandler(section.id, index)}>
                          <Input onChange={(e) => taskHandler(e)} value={newTask} onBlur={() => onBlurTaskHandler(section.id, index)} autoFocus />
                        </form>
                      ) : (
                        <Button type="link" style={{ display: "block" }} onClick={(i) => newTaskVisibilityHandler(index)}>
                          Add task
                        </Button>
                      )}
                    </div>
                  </Panel>
                ))}
              </Collapse>
              {newSectionVisibility === false ? (
                <Button type="primary" style={{ borderRadius: "8px" }} onClick={sectionVisibilityHandler} disabled={sectionLoading}>
                  <PlusOutlined />
                  {sectionLoading ? "Please wait..." : "Section"}
                </Button>
              ) : (
                <div className="add-section-container">
                  <div className="add-section-inputField">
                    <form onSubmit={onBlurSectionHandler}>
                      <Input onBlur={onBlurSectionHandler} autoFocus value={newSection} onChange={(e) => sectionHandler(e)} />
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
          <TaskDetailModal2 task={match.params.taskId} isVisible={isModalVisible} closeModal={closeModal} match={match} view="personal" project={selectedProject} />
        </Container>
      )}
    </div>
  );
};

export default PersonalTasks;
