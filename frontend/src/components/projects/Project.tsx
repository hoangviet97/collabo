import React, { useState, useEffect, FC } from "react";
import { connect } from "react-redux";
import { setFavorite } from "../../actions/project";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Row, Col, Button, Avatar, Tooltip } from "antd";
import { EllipsisOutlined, StarFilled } from "@ant-design/icons";
import "./Project.scss";
import AvatarIcon from "../utils/AvatarIcon";
import { project, member } from "../../types/types";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  project: project;
  projectCardHandler: (project_id: string) => void;
  members: member[];
}

const Project: FC<Props> = ({ project, projectCardHandler, members }) => {
  return (
    <div className="project-card">
      <div className="project-card__header">
        <Row>
          <Col span={20}>
            <div className={`project-status project-status__${project.status_id}`}>{project.status}</div>
          </Col>
          <Col span={4} style={{ textAlign: "end" }}>
            <div className="project-card__right-header">
              <EllipsisOutlined className="more-icon" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="project-card__body" style={{ width: "80%", overflowX: "hidden" }} onClick={() => projectCardHandler(project.id)}>
        <div className="text-ellipsis" style={{ fontSize: "20px" }}>
          {project.name}
        </div>
      </div>
      <div className="project-card__footer">
        <Avatar.Group maxCount={2} size="large" maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf", cursor: "pointer" }}>
          {members.map((item: member, index: number) => {
            return (
              <Tooltip key={index} title={item.email} placement="top">
                <Avatar style={{ backgroundColor: item.color === null || item.color.length < 1 ? color.normal_orange : item.color }}>
                  <AvatarIcon firstname={item.firstname} lastname={item.lastname} />
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
