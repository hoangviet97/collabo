import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { createProject } from "../../actions/project";

const NewProject = (props) => {
  const [projectName, setProjectName] = useState({ name: "" });

  const { name } = projectName;

  const changeHandler = (e) => {
    setProjectName({ name: e.target.value });
  };

  const submitHandler = (e) => {
    props.createProject({ name });
  };

  return (
    <div className="new-project">
      <div class="new-project__content">
        <div class="new-project__form">
          <Form layout="vertical">
            <Form.Item label="Choose your project name">
              <Input value={name} onChange={(e) => changeHandler(e)} placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={(e) => submitHandler(e)}>
                Create project
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div class="new-project__close">
          <Link to="/projects">Cancel</Link>
        </div>
      </div>
      <div class="new-project__bg"></div>
    </div>
  );
};

export default connect(null, { createProject })(NewProject);
