import React from "react";
import { Card, Row, Col, Progress, Avatar } from "antd";
import { EllipsisOutlined, StarOutlined } from "@ant-design/icons";

const Project = (props) => {
  return (
    <div className="project-card" onClick={() => props.projectCardHandler(props.project.id)} style={{ margin: "0px", padding: "25px", borderRadius: "10px", backgroundColor: "white" }}>
      <div className="project-card__header">
        <Row>
          <Col span={20}>
            <Progress type="circle" percent={25} width={50} />
          </Col>
          <Col span={4} style={{ textAlign: "end" }}>
            <div class="project-card__right-header" style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <StarOutlined />
              <EllipsisOutlined />
            </div>
          </Col>
        </Row>
      </div>
      <div class="project-card__body">
        <h3>{props.project.name}</h3>
      </div>
      <div class="project-card__footer">
        <Row style={{ display: "flex", justifyContent: "center", alignItems: "end" }}>
          <Col span={12}>
            <h4>Completed</h4>
          </Col>
          <Col span={12} style={{ textAlign: "end" }}>
            <Avatar.Group size={30} maxCount={2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
              <Avatar style={{ backgroundColor: "#1890ff" }} />
            </Avatar.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Project;
