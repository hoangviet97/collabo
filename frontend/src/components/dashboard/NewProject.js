import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

const NewProject = () => {
  return (
    <div className="new-project">
      <div class="new-project__content">
        <div class="new-project__form">
          <Form layout="vertical">
            <Form.Item label="Choose your project name">
              <Input placeholder="input placeholder" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Submit</Button>
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

export default NewProject;
