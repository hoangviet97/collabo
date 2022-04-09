import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { createSection } from "../../actions/section";
import { getSections, deleteSection } from "../../actions/section";
import { getProjectTasks, createTask, getAllAssignees } from "../../actions/task";
import { getTagsByTasks, getTags } from "../../actions/tag";
import { getMembers } from "../../actions/member";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Input, Button, Dropdown, Menu, Typography, Spin, Select, Divider } from "antd";
import { EllipsisOutlined, TagsOutlined, PlusOutlined, AppstoreOutlined, MenuOutlined } from "@ant-design/icons";
import TaskItem from "./TaskItem";
import TaskDetailModal from "../modal/TaskDetailModal";
import TaskCard from "./TaskCard";

const ProjectTasks = ({ match }) => {
  const dispatch = useDispatch();
  const project_id = match.params.id;

  // Ant components
  const { Panel } = Collapse;
  const { Text } = Typography;
  const { Option } = Select;

  const [selectedStatus, setSelectedStatus] = useState("0");

  // Selectors
  const sections = useSelector((state) => state.section.sections);
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const members = useSelector((state) => state.member.members);
  const assignees = useSelector((state) => state.task.assignees);
  const tags = useSelector((state) => state.tag.taskTags);
  const allTags = useSelector((state) => state.tag.tags);

  // States
  const [taskNameForSearch, setTaskNameForSearch] = useState("");
  const [children, setChildren] = useState([]);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [showStatusSelector, setShowStatusSelector] = useState(false);
  const [taskTags, setTaskTags] = useState([]);
  const [selectedVal, setSelectedVal] = useState([]);
  const [taskContainer, setTaskContainer] = useState([]);
  const [activeCards, setActiveCards] = useState(false);
  const [activeList, setActiveList] = useState(true);
  const [taskVisual, setTaskVisual] = useState("");
  const [filteredAssignees, setFilteredAssignees] = useState([]);

  const [newSectionVisibility, setNewSectionVisibility] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newSection, setNewSection] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskDetail, setTaskDetail] = useState({});
  const [newTaskIndexes, setNewTaskIndexes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("task_visual") === null) {
      localStorage.setItem("task_visual", "list");
    } else {
      setTaskVisual(localStorage.getItem("task_visual"));
    }
    dispatch(getSections({ project: project_id }));
    dispatch(getMembers({ id: project_id }));
    dispatch(getAllAssignees({ id: project_id }));
    dispatch(getProjectTasks({ project: project_id }));
    dispatch(getTagsByTasks({ project: project_id }));
    dispatch(getTags({ project: project_id }));
  }, []);

  useEffect(() => {
    setTaskContainer(tasks);
  }, [tasks]);

  useEffect(() => {
    const child = [];
    for (let i = 0; i < allTags.length; i++) {
      child.push(
        <Option key={allTags[i].id}>
          <div>
            <TagsOutlined />
            &nbsp;
            {allTags[i].name}
          </div>
        </Option>
      );
    }

    setChildren(child);
  }, [allTags]);

  const taskHandler = (e) => {
    setNewTask(e.target.value);
  };

  const sectionHandler = (e) => {
    setNewSection(e.target.value);
  };

  const newTaskVisibilityHandler = (index) => {
    setNewTaskIndexes({ [index]: true });
  };

  const sectionVisibilityHandler = () => {
    setNewSectionVisibility(true);
  };

  const onBlurTaskHandler = (sectionId, index) => {
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
      dispatch(createTask({ task: values }));
      setNewTask("");
      setSelectedVal([]);
    }
  };

  const onBlurSectionHandler = () => {
    setNewSectionVisibility(false);

    if (newSection.length === 0) {
      console.log("empty");
    } else {
      dispatch(createSection({ id: project_id, name: newSection }));
      setNewSection("");
    }
  };

  const panelHeader = (name, id) => (
    <React.Fragment>
      <div className="panel-header" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span className="panel-header__title" style={{ fontSize: "20px" }}>
          {name}
        </span>
        <Dropdown className="panel-dropdown" overlay={sectionMenu} trigger={["hover"]}>
          <a
            style={{ padding: "0px" }}
            type="link"
            onClick={(event) => {
              setSelectedSection(id);
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
          dispatch(deleteSection({ id: selectedSection }));
        }}
      >
        <Text type="danger">Delete</Text>
      </Menu.Item>
    </Menu>
  );

  const showModal = (task, section) => {
    Object.assign(task, { section_name: section });
    const filteredTags = tags.filter((x) => x.tasks_id === task.id);
    Object.assign(task, { tags: filteredTags });
    const filteredAssignees = assignees.filter((x) => x.tasks_id === task.id);
    Object.assign(task, { assignees: filteredAssignees });
    const assigneesArray = assignees.filter((i) => i.tasks_id === task.id);
    setFilteredAssignees(assigneesArray);
    setTaskDetail(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const showTagSelectorHandler = () => {
    setShowStatusSelector(false);
    setShowTagSelector((prev) => !prev);
  };

  const tagSelectorHandler = (val) => {
    setSelectedVal(val);
    const tasksIds = tags.filter((x) => val.includes(x.tags_id));
    const pom = tasksIds.map((x) => x.tasks_id);
    const newTasks = tasks.filter((item) => pom.includes(item.id));

    if (val.length > 0) {
      setTaskContainer(newTasks);
    } else {
      setTaskContainer(tasks);
    }
  };

  const showStatusSelectorHandler = () => {
    setShowTagSelector(false);
    setShowStatusSelector((prev) => !prev);
  };

  const StatusSelectorHandler = (value) => {
    const newTasks = value === "x" ? tasks : tasks.filter((x) => x.statusId === value);
    setTaskContainer(newTasks);
  };

  const setVisualHandler = (value) => {
    setTaskVisual(value);
    localStorage.setItem("task_visual", value);
  };

  return (
    <div className="project-tasks">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Container size="30">
          <header>
            <div className="task__header-options" style={{ display: "flex", justifyContent: "space-between" }}>
              <Input value={taskNameForSearch} onChange={(e) => setTaskNameForSearch(e.target.value)} placeholder="Search tasks by name" style={{ width: "40%" }} />
              <div style={{ display: "flex" }}>
                <span>Filter by: &nbsp;</span>
                <Button onClick={showTagSelectorHandler}>
                  <TagsOutlined />
                  Tags
                </Button>
                <Button onClick={showStatusSelectorHandler}>
                  <TagsOutlined />
                  Status
                </Button>
                <div className="projects-dimension">
                  <Button onClick={() => setVisualHandler("card")}>
                    <AppstoreOutlined />
                  </Button>
                  <Button onClick={() => setVisualHandler("list")}>
                    <MenuOutlined />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              {showTagSelector && (
                <Select mode="multiple" value={selectedVal} allowClear style={{ width: "40%", display: "block", marginTop: "5px" }} placeholder="Select tags" onChange={tagSelectorHandler}>
                  {children}
                </Select>
              )}
              {showStatusSelector && (
                <Select showSearch placeholder="Select a status" style={{ width: 200, marginTop: "5px" }} onChange={StatusSelectorHandler}>
                  <Option value="x">All</Option>
                  <Option value="0">Open</Option>
                  <Option value="1">In Progress</Option>
                  <Option value="2">On Hold</Option>
                  <Option value="3">Completed</Option>
                  <Option value="4">Cancelled</Option>
                </Select>
              )}
            </div>
          </header>
          <Divider />
          <Collapse className="task-collapse" style={{ padding: 0, marginTop: "20px", width: "100%" }} collapsible="header" defaultActiveKey={["1"]} ghost>
            {sections.map((section, index) => (
              <Panel style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "12px" }} className="task-panel" key={section.id} header={panelHeader(section.name, section.id)}>
                <div className={`task__visual-${taskVisual}`}>
                  {taskContainer
                    .filter((x) => {
                      return x.title.toLowerCase().includes(taskNameForSearch.toLocaleLowerCase());
                    })
                    .map((task, i) => {
                      if (section.id === task.sections_id) {
                        const assigneesArray = assignees.filter((i) => i.tasks_id === task.id);
                        if (taskVisual === "list") {
                          return <TaskItem showModal={showModal} closeModal={closeModal} projectId={project_id} sectionName={section.name} key={i} assignees={assigneesArray} members={members} task={task} start_date={task.start_date} />;
                        } else if (taskVisual === "card") {
                          return <TaskCard task={task} projectId={project_id} sectionName={section.name} showModal={showModal} closeModal={closeModal} assignees={assigneesArray} members={members} />;
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
            <Button type="primary" style={{ borderRadius: "8px" }} onClick={sectionVisibilityHandler}>
              <PlusOutlined />
              Section
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
          <TaskDetailModal task={taskDetail} members={members} tags={allTags} projectId={project_id} assignees={filteredAssignees} isVisible={isModalVisible} closeModal={closeModal} />
        </Container>
      )}
    </div>
  );
};

export default ProjectTasks;
