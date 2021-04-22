import React, { useEffect, useState } from "react";
import Toolbar from "../../Toolbar";
import Container from "../../../utils/Container";
import { createSection } from "../../../../actions/section";
import { getSections } from "../../../../actions/section";
import { getProjectTasks } from "../../../../actions/task";
import { connect } from "react-redux";
import { Collapse, Input, Button } from "antd";

const ProjectTasks = (props) => {
  useEffect(() => {
    props.getSections({ id: props.match.params.id });
    props.getProjectTasks({ id: props.match.params.id });
  }, []);

  const { Panel } = Collapse;
  const [newSection, setNewSection] = useState("");

  const sectionHandler = (e) => {
    setNewSection(e.target.value);
  };

  const addSectionHandler = () => {
    props.createSection({ id: props.match.params.id });
  };

  return (
    <div className="project-tasks">
      <Toolbar />
      <Container size="30">
        <Collapse defaultActiveKey={["1"]} ghost>
          {props.sections.map((section) => (
            <Panel key={section.id} header={section.name}>
              <table border="1">
                {props.tasks.map((task) => {
                  if (section.id === task.sections_id) {
                    return (
                      <tr>
                        <td style={{ padding: "7px" }}>{task.name}</td>
                        <td style={{ padding: "7px" }}>{task.description}</td>
                        <td style={{ padding: "7px" }}>{task.priorities_id}</td>
                        <td style={{ padding: "7px" }}>{task.due_date}</td>
                      </tr>
                    );
                  }
                })}
              </table>
            </Panel>
          ))}
        </Collapse>
        <div class="add-section-container">
          <div class="add-section-inputField">
            <Input value={newSection} onChange={(e) => sectionHandler(e)} />
            <Button onClick={addSectionHandler}>Add Section</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: state.section.sections,
  tasks: state.task.tasks
});

export default connect(mapStateToProps, { getSections, getProjectTasks, createSection })(ProjectTasks);
