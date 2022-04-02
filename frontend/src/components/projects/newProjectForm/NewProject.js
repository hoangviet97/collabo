import React, { useState, FC } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { connect, useDispatch } from "react-redux";
import { createProject } from "../../../actions/project";
import ColorCubic from "../../utils/ColorCubic";

const NewProject = ({ history }) => {
  const dispatch = useDispatch();
  const colorSet = ["#f9ca24", "#f0932b", "#eb4d4b", "#badc58", "#7ed6df", "#e056fd", "#686de0", "#30336b", "#535c68"];

  const [projectName, setProjectName] = useState({ name: "" });
  const [color, setColor] = useState("");
  const [chosen, setChosen] = useState("");

  const { name } = projectName;

  const changeHandler = (e) => {
    setProjectName({ name: e.target.value });
  };

  const handleIconColor = (e) => {
    setColor(e);
  };

  const submitHandler = (e) => {
    const { push } = history;
    dispatch(createProject({ name, color, push }));
  };

  return (
    <div className="new-project">
      <div className="new-project__content">
        <div className="new-project__form">
          <Form layout="vertical">
            <Form.Item label="Choose your project name">
              <Input value={name} onChange={(e) => changeHandler(e)} placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Choose your color">
              <div class="icon-colorbox" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {colorSet.map((item, index) => (
                  <ColorCubic
                    onClick={() => {
                      handleIconColor(item);
                      setChosen(index);
                    }}
                    active={index === chosen}
                    key={index}
                    color={item}
                  />
                ))}
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={(e) => submitHandler(e)}>
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
