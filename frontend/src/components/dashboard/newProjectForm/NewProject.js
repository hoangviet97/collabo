import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { createProject } from "../../../actions/project";

const NewProject = (props) => {
  const [projectName, setProjectName] = useState({ name: "" });

  const { name } = projectName;

  const changeHandler = (e) => {
    setProjectName({ name: e.target.value });
  };

  const submitHandler = (e) => {
    const { push } = props.history;
    props.createProject({ name, push });
  };

  return (
    <div className="new-project">
      <div className="new-project__content">
        <div className="new-project__form">
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
        <div className="new-project__close">
          <Link to="/projects">Cancel</Link>
        </div>
      </div>
      <div className="new-project__bg"></div>
    </div>
  );
};

export default withRouter(connect(null, { createProject })(NewProject));
