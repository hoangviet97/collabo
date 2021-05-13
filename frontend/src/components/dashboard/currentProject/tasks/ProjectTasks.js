import React, { useEffect, useState } from "react";
import Toolbar from "../../Toolbar";
import Container from "../../../utils/Container";
import { createSection } from "../../../../actions/section";
import { getSections, deleteSection } from "../../../../actions/section";
import { getProjectTasks } from "../../../../actions/task";
import { connect } from "react-redux";
import { Collapse, Input, Button, Dropdown, Menu, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TaskItem from "../../tasks/TaskItem";
import TaskHeader from "../../tasks/TaskHeader";
import Spinner from "../../../utils/Spinner";

const ProjectTasks = (props) => {
  useEffect(() => {
    props.getSections({ id: props.match.params.id });
    props.getProjectTasks({ id: props.match.params.id });
  }, []);

  const { Panel } = Collapse;
  const { Text } = Typography;

  const [newSectionVisibility, setNewSectionVisibility] = useState(false);
  const [newSection, setNewSection] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const sectionHandler = (e) => {
    setNewSection(e.target.value);
  };

  const sectionVisibilityHandler = () => {
    setNewSectionVisibility(true);
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
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span>{name}</span>
        <Dropdown overlay={sectionMenu} trigger={["click"]}>
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
        <span>Rename</span>
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

  return (
    <div className="project-tasks">
      <Toolbar />
      <Container size="30">
        <TaskHeader />
        <Collapse className="task-collapse" style={{ padding: 0, marginTop: "20px", width: "100%" }} collapsible="header" defaultActiveKey={["1"]} ghost>
          {props.sections.map((section) => (
            <Panel className="task-panel" key={section.id} header={panelHeader(section.name, section.id)}>
              {props.tasks.map((task, index) => {
                if (section.id === task.sections_id) {
                  return <TaskItem key={index} tasks={task} id={task.id} name={task.name} status={task.status} priority={task.priority} due_date={task.due_date} />;
                }
              })}
              <Button type="link">Add new task</Button>
            </Panel>
          ))}
        </Collapse>
        <Container size="15">
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
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: state.section.sections,
  tasks: state.task.tasks,
  loading: state.section.loading
});

export default connect(mapStateToProps, { getSections, getProjectTasks, createSection, deleteSection })(ProjectTasks);
