import React, { useState, useEffect, FC } from "react";
import { connect } from "react-redux";
import { setFavorite } from "../../actions/project";
import { getProjectTasks, getAllAssignees } from "../../actions/task";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Progress, Button, Avatar, Tooltip } from "antd";
import { EllipsisOutlined, StarFilled } from "@ant-design/icons";
import "./Project.scss";
import AvatarIcon from "../utils/AvatarIcon";
import colorList from "../utils/colors";
import { truncade } from "../utils/textManipulation";

const Project = ({ project, projectCardHandler, setFavorite, members }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const favoriteToggle = () => {
    setFavorite({ id: project.id, status: project.favorite === 1 ? 0 : 1 });
  };

  return (
    <div className="project-card">
      <div className="project-card__header">
        <Row>
          <Col span={20}>
            <div className={`project-status project-status__${project.status_id}`}>{project.status}</div>
          </Col>
          <Col span={4} style={{ textAlign: "end" }}>
            <div className="project-card__right-header">
              <StarFilled onClick={favoriteToggle} className="project-card__favorite" style={{ color: project.favorite === 1 ? "#FFD700" : "black" }} />
              <EllipsisOutlined className="more-icon" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="project-card__body" onClick={() => projectCardHandler(project.id)}>
        <h2>{truncade(project.name, 40)}</h2>
        <p>{truncade("N description here.....................mjiomkloiu", 50)}</p>
      </div>
      <div className="project-card__footer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Avatar.Group maxCount={2} maxPopoverTrigger="click" size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf", cursor: "pointer" }}>
          {members.map((item) => {
            let randNum = Math.floor(Math.random() * 6);
            console.log(colorList.colorList[randNum].code);
            return (
              <Tooltip title={item.email} placement="top">
                <Avatar style={{ backgroundColor: `${colorList.colorList[randNum].code}` }}>
                  <AvatarIcon name={item.firstname} />
                </Avatar>
              </Tooltip>
            );
          })}
        </Avatar.Group>
        <Button style={{ borderRadius: "12px" }} onClick={() => projectCardHandler(project.id)} type="dashed">
          Go to project
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { setFavorite })(Project);
