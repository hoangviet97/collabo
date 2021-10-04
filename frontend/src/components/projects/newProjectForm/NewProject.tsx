import React, { useState, FC } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { connect, useDispatch } from "react-redux";
import { createProject } from "../../../actions/project";

interface Props {
  history: any;
}

const NewProject: FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState({ name: "" });

  const { name } = projectName;

  const changeHandler = (e: any) => {
    setProjectName({ name: e.target.value });
  };

  const submitHandler = (e: string) => {
    const { push } = history;
    dispatch(createProject({ name, push }));
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
              <Button type="primary" onClick={(e: any) => submitHandler(e)}>
                Create project
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="new-project__close">
          <Link to="/">Cancel</Link>
        </div>
      </div>
      <div className="new-project__bg"></div>
    </div>
  );
};

export default withRouter(NewProject);
