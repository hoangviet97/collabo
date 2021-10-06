import React, { useEffect, useState, FC } from "react";
import Container from "../utils/Container";
import { createSection } from "../../actions/section";
import { getSections, deleteSection } from "../../actions/section";
import { getProjectTasks, createTask, getAllAssignees } from "../../actions/task";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Collapse, Input, Button, Dropdown, Menu, Typography, Spin } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TaskItem from "./TaskItem";
import TaskDetailModal from "../modal/TaskDetailModal";

interface Props {
  match: any;
}

const ProjectTasks: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const project_id = match.params.id;
  const sections = useSelector((state: RootStateOrAny) => state.section.sections);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const loading = useSelector((state: RootStateOrAny) => state.task.loading);
  const assignees = useSelector((state: RootStateOrAny) => state.task.assignees);

  useEffect(() => {
    dispatch(getSections({ id: project_id }));
    dispatch(getAllAssignees({ id: project_id }));
    dispatch(getProjectTasks({ id: project_id }));
  }, []);

  const { Panel } = Collapse;
  const { Text } = Typography;

  const [newSectionVisibility, setNewSectionVisibility] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [newSection, setNewSection] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [taskDetail, setTaskDetail] = useState<any>({});
  const [newTaskIndexes, setNewTaskIndexes] = useState<any>([]);

  const taskHandler = (e: any) => {
    setNewTask(e.target.value);
  };

  const sectionHandler = (e: any) => {
    setNewSection(e.target.value);
  };

  const newTaskVisibilityHandler = (index: any) => {
    setNewTaskIndexes({ [index]: true });
  };

  const sectionVisibilityHandler = () => {
    setNewSectionVisibility(true);
  };

  const onBlurTaskHandler = (sectionId: any, index: any) => {
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
      dispatch(createTask({ task: values, projectId: project_id }));
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

  const panelHeader = (name: any, id: any) => (
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
        onClick={(event: any) => {
          dispatch(deleteSection({ id: selectedSection }));
          event.stopPropagation();
        }}
      >
        <Text type="danger">Delete</Text>
      </Menu.Item>
    </Menu>
  );

  const showModal = (task: any, section: any) => {
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
            {sections.map((section: any, index: any) => (
              <Panel style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "12px" }} className="task-panel" key={section.id} header={panelHeader(section.name, section.id)}>
                {tasks.map((task: any, i: any) => {
                  if (section.id === task.sections_id) {
                    const assigneesArray = assignees.filter((i: any) => i.tasks_id === task.id);
                    return <TaskItem showModal={showModal} closeModal={closeModal} projectId={project_id} sectionName={section.name} key={i} assignees={assigneesArray} task={task} start_date={task.start_date} />;
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
