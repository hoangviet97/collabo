import React from "react";
import { connect } from "react-redux";
import { setFavorite } from "../../../actions/project";
import { Row, Col, Progress, Avatar } from "antd";
import { EllipsisOutlined, StarFilled } from "@ant-design/icons";

const Project = ({ project, projectCardHandler, setFavorite }) => {
  // need to fix - boolean or num
  const starStyle = project.favorite === 1 && "#FFD700";

  const favoriteToggle = () => {
    setFavorite({ id: project.id, status: project.favorite === 1 ? 0 : 1 });
    console.log(!!project.favorite);
  };

  return (
    <div className="project-card" style={{ margin: "0px", padding: "25px", borderRadius: "10px", backgroundColor: "white" }}>
      <div className="project-card__header">
        <Row>
          <Col span={20}>
            <Progress type="circle" percent={25} width={50} />
          </Col>
          <Col span={4} style={{ textAlign: "end" }}>
            <div className="project-card__right-header">
              <StarFilled onClick={favoriteToggle} className="project-card__favorite" style={{ color: starStyle }} />
              <EllipsisOutlined />
            </div>
          </Col>
        </Row>
      </div>
      <div className="project-card__body" onClick={() => projectCardHandler(project.id)}>
        <h3>{project.name}</h3>
      </div>
      <div className="project-card__footer">
        <Row className="project-card__footer-row">
          <Col span={12}>
            <h4>Completed {project.favorite === true ? "ITS TRUE" : "ITS FALSE"}</h4>
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

export default connect(null, { setFavorite })(Project);
