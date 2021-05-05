import React from "react";
import { Card, Row, Col, Progress } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const Project = (props) => {
  return (
    <div className="project-card" onClick={() => props.projectCardHandler(props.project.id)} style={{ margin: "0px", padding: "25px", borderRadius: "10px", backgroundColor: "white" }}>
      <div className="project-card__header">
        <Row>
          <Col span={20}>
            <Progress type="circle" percent={75} width={50} />
          </Col>
          <Col span={4} style={{ textAlign: "end" }}>
            <EllipsisOutlined />
          </Col>
        </Row>
      </div>
      <div class="project-card__body">
        <h3>{props.project.name}</h3>
      </div>
    </div>
  );
};

export default Project;
