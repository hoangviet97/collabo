import React, { useState, useEffect, FC } from "react";
import { connect } from "react-redux";
import { setFavorite } from "../../actions/project";
import { getProjectTasks, getAllAssignees } from "../../actions/task";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Progress, Avatar } from "antd";
import { EllipsisOutlined, StarFilled } from "@ant-design/icons";
import "./Project.scss";

const Project = ({ project, projectCardHandler, setFavorite }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const favoriteToggle = () => {
    setFavorite({ id: project.id, status: project.favorite === 1 ? 0 : 1 });
  };

  return (
    <div className="project-card">
      <div className="project-card__header">
        <Row>
          <Col span={20} onClick={() => projectCardHandler(project.id)}>
            <h3>{project.name}</h3>
          </Col>
          <Col span={4} style={{ textAlign: "end" }}>
            <div className="project-card__right-header">
              <StarFilled onClick={favoriteToggle} className="project-card__favorite" style={{ color: project.favorite === 1 ? "#FFD700" : "black" }} />
              <EllipsisOutlined className="more-icon" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="project-card__body" onClick={() => projectCardHandler(project.id)}></div>
      <div className="project-card__footer">
        <Row className="project-card__footer-row">
          <Col span={12}>
            <div className={`project-status project-status__${project.status_id}`}>{project.status}</div>
          </Col>
          <Col className="project-card__members" span={12}>
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

export default connect(null, { setFavorite })(Project);
