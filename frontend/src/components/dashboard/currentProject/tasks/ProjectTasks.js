import React, { useEffect, useState } from "react";
import Toolbar from "../../Toolbar";
import Container from "../../../utils/Container";
import { createSection } from "../../../../actions/section";
import { getSections } from "../../../../actions/section";
import { getProjectTasks } from "../../../../actions/task";
import { connect } from "react-redux";
import { Collapse, Input, Button, Dropdown, Menu, Typography } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import TaskItem from "../../tasks/TaskItem";
import TaskHeader from "../../tasks/TaskHeader";

const ProjectTasks = (props) => {
  useEffect(() => {
    props.getSections({ id: props.match.params.id });
    props.getProjectTasks({ id: props.match.params.id });
  }, []);

  const { Panel } = Collapse;
  const { Text } = Typography;

  const [newSection, setNewSection] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const sectionHandler = (e) => {
    setNewSection(e.target.value);
  };

  const deleteSection = () => {
    console.log(selectedSection);
  };

  const addSectionHandler = () => {
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
            deleteSection();
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
        <Collapse style={{ padding: 0, margin: 0, width: "100%" }} collapsible="header" defaultActiveKey={["1"]} ghost>
          <Container size="15">
            <TaskHeader />
          </Container>
          {props.sections.map((section) => (
            <Panel key={section.id} header={panelHeader(section.name, section.id)}>
              {props.tasks.map((task, index) => {
                if (section.id === task.sections_id) {
                  return <TaskItem key={index} name={task.name} status={task.status} priority={task.priority} due_date={task.due_date} />;
                }
              })}
            </Panel>
          ))}
        </Collapse>
        <Container size="15">
          <div className="add-section-container">
            <div className="add-section-inputField">
              <Input value={newSection} onChange={(e) => sectionHandler(e)} />
              <Button onClick={addSectionHandler}>Add Section</Button>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: state.section.sections,
  tasks: state.task.tasks
});

export default connect(mapStateToProps, { getSections, getProjectTasks, createSection })(ProjectTasks);
