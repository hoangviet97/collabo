import React, { useEffect, useState } from "react";
import Toolbar from "../../Toolbar";
import Container from "../../../utils/Container";
import { createSection } from "../../../../actions/section";
import { getSections, deleteSection } from "../../../../actions/section";
import { getProjectTasks, createTask, getAllAssignees } from "../../../../actions/task";
import { connect } from "react-redux";
import { Collapse, Input, Button, Dropdown, Menu, Typography, Modal, Breadcrumb } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TaskItem from "../../tasks/TaskItem";
import TaskHeader from "../../tasks/TaskHeader";
import Spinner from "../../../utils/Spinner";

const ProjectTasks = (props) => {
  useEffect(() => {
    props.getSections({ id: props.match.params.id });
    props.getAllAssignees({ id: props.match.params.id });
    props.getProjectTasks({ id: props.match.params.id });
  }, []);

  const { Panel } = Collapse;
  const { Text } = Typography;

  const [newSectionVisibility, setNewSectionVisibility] = useState(false);
  const [newTaskVisibility, setNewTaskVisibility] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newSection, setNewSection] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [panelName, setPanelName] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskDetail, setTaskDetail] = useState(null);
  const [sectionName, setSectionName] = useState(null);

  const taskHandler = (e) => {
    setNewTask(e.target.value);
  };

  const sectionHandler = (e) => {
    setNewSection(e.target.value);
  };

  const newTaskVisibilityHandler = () => {
    setNewTaskVisibility(true);
  };

  const sectionVisibilityHandler = () => {
    setNewSectionVisibility(true);
  };

  const onBlurTaskHandler = (sectionId) => {
    setNewTaskVisibility(false);

    const values = {
      sectionId: sectionId,
      priorityId: "0",
      statusId: "0",
      name: newTask,
      description: null,
      start_date: null,
      due_date: null,
      assigneesArray: []
    };

    if (newTask.length > 0) {
      props.createTask({ task: values, projectId: props.match.params.id });
      setNewTask("");
    } else {
      console.log("empty name");
    }
  };

  const onBlurSectionHandler = () => {
    setNewSectionVisibility(false);

    if (newSection.length === 0) {
      console.log("empty");
    } else {
      props.createSection({ id: props.match.params.id, name: newSection });
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
      <Menu.Item key="1">
        <Text
          type="danger"
          onClick={(event) => {
            props.deleteSection({ id: selectedSection });
            event.stopPropagation();
          }}
        >
          Delete
        </Text>
      </Menu.Item>
    </Menu>
  );

  const showModal = (id, sectionName) => {
    let task = props.tasks.filter((item) => item.id === id);
    setTaskDetail(task[0]);
    setSectionName(sectionName);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="project-tasks">
      <Container size="30">
        <Collapse className="task-collapse" style={{ padding: 0, marginTop: "20px", width: "100%" }} collapsible="header" defaultActiveKey={["1"]} ghost>
          {props.sections.map((section, index) => (
            <Panel style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "12px" }} className="task-panel" key={section.id} header={panelHeader(section.name, section.id, index)}>
              {props.tasks.map((task, index) => {
                if (section.id === task.sections_id) {
                  return <TaskItem showModal={showModal} projectId={props.match.params.id} sectionName={section.name} key={index} assignees={props.assignees} task={task} />;
                }
              })}
              {newTaskVisibility ? (
                <form onSubmit={() => onBlurTaskHandler(section.id)}>
                  <Input onChange={(e) => taskHandler(e)} value={newTask} onBlur={() => onBlurTaskHandler(section.id)} autoFocus />
                </form>
              ) : (
                <Button style={{ paddingLeft: "0" }} type="link" onClick={newTaskVisibilityHandler}>
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
      </Container>

      <Modal visible={isModalVisible} width="90%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}>
        <div className="task-detail-window">
          <header className="task-detail-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f5f6fa", padding: "8px 12px" }}>
            <div class="task-detail-bread" style={{ backgroundColor: "white", padding: "5px 12px", border: "0.5px solid grey", borderRadius: "10px" }}>
              <Breadcrumb>
                <Breadcrumb.Item>{sectionName}</Breadcrumb.Item>
                <Breadcrumb.Item>{taskDetail && taskDetail.name}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Button style={{ borderRadius: "10px" }} onClick={closeModal}>
              X
            </Button>
          </header>
          <div class="task-detail-body" style={{ width: "100%", height: "100%" }}>
            <div class="task-detail-data" style={{ backgroundColor: "blue", width: "55%", height: "100%" }}>
              dwd
            </div>
            <div class="task-detail-comments" style={{ backgroundColor: "red", width: "45%", height: "100%" }}></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: state.section.sections,
  tasks: state.task.tasks,
  assignees: state.task.assignees,
  loading: state.section.loading,
  project: state.project.currentProject
});

export default connect(mapStateToProps, { getSections, getProjectTasks, createTask, createSection, deleteSection, getAllAssignees })(ProjectTasks);
