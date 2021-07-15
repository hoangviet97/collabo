import React, { useState } from "react";
import { connect } from "react-redux";
import { setFavorite } from "../../../actions/project";
import { Row, Col, Progress, Avatar, Dropdown, Menu, Typography, Modal } from "antd";
import { EllipsisOutlined, StarFilled, DeleteOutlined, LeftSquareOutlined, InfoCircleOutlined } from "@ant-design/icons";
import DeleteModal from "../../modal/DeleteModal";
import ProjectStatus from "../../utils/ProjectStatus";

const Project = ({ project, projectCardHandler, setFavorite }) => {
  const { Text } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const starStyle = project.favorite === 1 && "#FFD700";

  const sectionMenu = () => (
    <Menu>
      <Menu.Item key="0" onClick={showModal}>
        <InfoCircleOutlined />
        <span>Details</span>
      </Menu.Item>
      <Menu.Item key="1">
        <LeftSquareOutlined />
        <span>Leave</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={DeleteModal}>
        <DeleteOutlined />
        <Text type="danger">Delete</Text>
      </Menu.Item>
    </Menu>
  );

  const favoriteToggle = () => {
    setFavorite({ id: project.id, status: project.favorite === 1 ? 0 : 1 });
    console.log(!!project.favorite);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
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
              <Dropdown style={{ borderRadius: "50px" }} trigger={["hover"]} overlay={sectionMenu} placement="bottomRight">
                <EllipsisOutlined className="more-icon" />
              </Dropdown>
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
            <div className={`project-status project-status__${project.status_id}`}>{project.status}</div>
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
      <Modal visible={isModalVisible} width="90%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}></Modal>
    </div>
  );
};

export default connect(null, { setFavorite })(Project);
