import React, { useState, FC, ChangeEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { createProject } from "../../redux/actions/project";
import colorVar from "../../styles/abstract/variables.module.scss";

const NewProjectPage = () => {
  const dispatch = useDispatch();
  const history: any = useHistory();
  const loading = useSelector((state: RootStateOrAny) => state.project.loading);
  const [selected, setSelected] = useState<string>("");
  const colorSet: string[] = [colorVar.normal_green, colorVar.normal_reef, colorVar.light_orange, colorVar.normal_orange, colorVar.normal_red, colorVar.normal_blue, colorVar.normal_purple, colorVar.normal_koamaru, colorVar.normal_grey];
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [chosen, setChosen] = useState<number>();

  const handleIconColor = (e: any) => {
    setColor(e);
  };

  const colorCubicStateHandler = (item: any, index: number) => {
    handleIconColor(item);
    setChosen(index);
  };

  const submitHandler = () => {
    const { push } = history;
    if (color.length === 0 || name.length === 0) {
      message.error("Choose your project title and color!");
    } else {
      dispatch(createProject({ name, color, push }));
    }
  };

  return (
    <div className="new-project">
      <div className="new-project__content">
        <div className="new-project__form">
          <Form layout="vertical">
            <Form.Item label="Choose your project name">
              <Input aria-label="project-name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="input placeholder" />
            </Form.Item>
            <Form.Item label="Choose your color">
              <div className="icon-colorbox" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {colorSet.map((item, index) => (
                  <div key={index} className={chosen === index ? "active-color-box" : "color-box"} onClick={() => colorCubicStateHandler(item, index)} style={{ backgroundColor: item, width: "50px", height: "50px" }}></div>
                ))}
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={submitHandler} disabled={loading}>
                {loading ? "Please wait..." : " Create project"}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="new-project__close">
          <a href="/">Cancel</a>
        </div>
      </div>
      <div className="new-project__bg">
        <div style={{ width: "100%", height: "100%", opacity: 0.5, backgroundColor: color.length === 0 ? "#a4b0be" : color }}></div>
      </div>
    </div>
  );
};

export default NewProjectPage;
