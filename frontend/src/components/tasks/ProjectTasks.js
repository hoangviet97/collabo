import React, { useEffect, useState, FC } from "react";
import Container from "../utils/Container";
import { createSection } from "../../actions/section";
import { getSections, deleteSection } from "../../actions/section";
import { getProjectTasks, createTask, getAllAssignees } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { useDispatch, useSelector } from "react-redux";
import { Collapse, Input, Button, Dropdown, Menu, Typography, Spin } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TaskItem from "./TaskItem";
import TaskDetailModal from "../modal/TaskDetailModal";

const ProjectTasks = ({ match }) => {
  const dispatch = useDispatch();
  const project_id = match.params.id;
  const sections = useSelector((state) => state.section.sections);
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);
  const members = useSelector((state) => state.member.members);
  const assignees = useSelector((state) => state.task.assignees);

  useEffect(() => {
    dispatch(getSections({ id: project_id }));
    dispatch(getMembers({ id: project_id }));
    dispatch(getAllAssignees({ id: project_id }));
    dispatch(getProjectTasks({ id: project_id }));
  }, []);

  const { Panel } = Collapse;
  const { Text } = Typography;

  const [newSectionVisibility, setNewSectionVisibility] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newSection, setNewSection] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskDetail, setTaskDetail] = useState({});
  const [newTaskIndexes, setNewTaskIndexes] = useState([]);

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
          event.stopPropagation();
        }}
      >
        <Text type="danger">Delete</Text>
      </Menu.Item>
    </Menu>
  );

  const showModal = (task, section) => {
    Object.assign(task, { section_name: section });
    setTaskDetail(task);
    console.log(task);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="project-tasks">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Container size="30">
          <Collapse className="task-collapse" style={{ padding: 0, marginTop: "20px", width: "100%" }} collapsible="header" defaultActiveKey={["1"]} ghost>
            {sections.map((section, index) => (
              <Panel style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "12px" }} className="task-panel" key={section.id} header={panelHeader(section.name, section.id)}>
                {tasks.map((task, i) => {
                  if (section.id === task.sections_id) {
                    const assigneesArray = assignees.filter((i) => i.tasks_id === task.id);
                    return <TaskItem showModal={showModal} closeModal={closeModal} projectId={project_id} sectionName={section.name} key={i} assignees={assigneesArray} members={members} task={task} start_date={task.start_date} />;
                  }
                })}
                {newTaskIndexes[index] === true ? (
                  <form onSubmit={() => onBlurTaskHandler(section.id, index)}>
                    <Input onChange={(e) => taskHandler(e)} value={newTask} onBlur={() => onBlurTaskHandler(section.id, index)} autoFocus />
                  </form>
                ) : (
                  <Button type="link" onClick={(i) => newTaskVisibilityHandler(index)}>
                    Add task
                  </Button>
                )}
              </Panel>
            ))}
          </Collapse>
          {newSectionVisibility === false ? (
            <Button onClick={sectionVisibilityHandler}>Add new section</Button>
          ) : (
            <div className="add-section-container">
              <div className="add-section-inputField">
                <form onSubmit={onBlurSectionHandler}>
                  <Input onBlur={onBlurSectionHandler} autoFocus value={newSection} onChange={(e) => sectionHandler(e)} />
                </form>
              </div>
            </div>
          )}
          <TaskDetailModal task={taskDetail} assignees={assignees} isVisible={isModalVisible} closeModal={closeModal} />
        </Container>
      )}
    </div>
  );
};

export default ProjectTasks;
