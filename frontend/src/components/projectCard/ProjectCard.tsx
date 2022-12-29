import React, { FC } from "react";
import { connect } from "react-redux";
import { setFavorite } from "../../redux/actions/project";
import { Row, Col, Button, Avatar, Tooltip } from "antd";
import "./Project.scss";
import AvatarIcon from "../utils/AvatarIcon";
import { project, member } from "../../types/types";
import color from "../../styles/abstract/variables.module.scss";

interface Props {
  project: project;
  projectCardHandler: (project_id: string) => void;
  members: member[];
}

const ProjectCard: FC<Props> = ({ project, projectCardHandler, members }) => {
  return (
    <div className="project__card">
      <div className="project__card-header">
        <Row>
          <Col span={20}>
            <div className={`project-status project-status__${project.status_id}`}>{project.status}</div>
          </Col>
        </Row>
      </div>
      <div className="project__card-body" onClick={() => projectCardHandler(project.id)}>
        <div className="text-ellipsis" style={{ fontSize: "20px" }}>
          {project.name}
        </div>
      </div>
      <div className="project__card-footer">
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

export default connect(null, { setFavorite })(ProjectCard);
