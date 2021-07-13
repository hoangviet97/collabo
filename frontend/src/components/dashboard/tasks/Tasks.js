import React, { useState, useEffect } from "react";
import Toolbar from "../Toolbar";
import Container from "../../utils/Container";
import { Button, Select, Collapse, Dropdown, Menu, Typography } from "antd";
import { InboxOutlined, EllipsisOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSections, deleteSection, resetSections } from "../../../actions/section";
import { getPersonalTasks } from "../../../actions/task";
import { getProjects } from "../../../actions/project";
import TaskItem from "./TaskItem";
import io from "socket.io-client";

const Tasks = (props) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const { Panel } = Collapse;
  const { Text } = Typography;

  let socket = io("http://localhost:9000/tasks");

  useEffect(() => {
    props.resetSections();
    props.getProjects();
  }, []);

  const { Option } = Select;
  let content = null;

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

  content = (
    <div className="no-content">
      <InboxOutlined style={{ fontSize: "50px", color: "grey" }} />
      <h2>There're no tasks for you</h2>
      <Button type="primary">Create your first task</Button>
    </div>
  );

  const onProjectSelect = (value) => {
    props.getSections({ id: value });
    props.getPersonalTasks({ id: value });
  };

  return (
    <div>
      <Container size="30">
        <h2>Manage Your Assigneed Tasks</h2>
        <Toolbar>
          <div class="tasks-select-group">
            <Select placeholder="Select project" onSelect={onProjectSelect} style={{ width: 250 }} allowClear>
              <Option value="all">All</Option>
              {props.projects.map((project) => (
                <Option value={project.id}>{project.name}</Option>
              ))}
            </Select>
          </div>
        </Toolbar>
        <Collapse className="task-collapse" style={{ padding: 0, marginTop: "20px", width: "100%" }} collapsible="header" defaultActiveKey={["1"]} ghost>
          {props.sections.map((section, index) => (
            <Panel key={index} style={{ backgroundColor: "white", marginBottom: "10px", borderRadius: "12px" }} className="task-panel" key={section.id} header={panelHeader(section.name, section.id, index)}>
              {props.tasks.map((task, index) => {
                if (section.id === task.sections_id) {
                  return <TaskItem key={index} tasks={task} id={task.id} name={task.name} status={task.statusId} priority={task.priorityId} due_date={task.due_date} />;
                }
              })}
            </Panel>
          ))}
        </Collapse>
        <button onClick={() => socket.emit("close")}>Click</button>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  projects: state.project.projects,
  sections: state.section.sections,
  tasks: state.task.tasks
});

export default connect(mapStateToProps, { getSections, deleteSection, getProjects, getPersonalTasks, resetSections })(Tasks);
