import React, { useState, useEffect } from "react";
import { Avatar, Popover, Modal, Form, Input, Dropdown, Menu } from "antd";
import { ThunderboltOutlined, TrophyOutlined, ShareAltOutlined, FireOutlined, DingtalkOutlined, CrownOutlined, CalendarOutlined, DownOutlined, FileTextOutlined, DashboardOutlined, TeamOutlined, FundProjectionScreenOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProjectNavigation = (props) => {
  let path = window.location.pathname;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const iconSet = [<ThunderboltOutlined />, <TrophyOutlined />, <ShareAltOutlined />, <FireOutlined />, <DingtalkOutlined />, <CrownOutlined />];

  useEffect(() => {
    setProjectName(props.project.currentProject.name);
    setProjectDescription(props.project.currentProject.description);
  }, [props]);

  const iconMenu = (
    <Menu>
      <Menu.Item>
        <ThunderboltOutlined />
      </Menu.Item>
      <Menu.Item>
        <TrophyOutlined />
      </Menu.Item>
      <Menu.Item>
        <ShareAltOutlined />
      </Menu.Item>
      <Menu.Item>
        <FireOutlined />
      </Menu.Item>
      <Menu.Item>
        <DingtalkOutlined />
      </Menu.Item>
      <Menu.Item>
        <CrownOutlined />
      </Menu.Item>
    </Menu>
  );

  const moreContent = (
    <div>
      <p>
        <Link className="project-nav-link" to={`/${path.split("/")[1]}/team`}>
          <TeamOutlined className="project-nav-link__icon" />
          <span>Team</span>
        </Link>
      </p>
      <p>
        <Link className="project-nav-link" to={`/${path.split("/")[1]}/sessions`}>
          <FundProjectionScreenOutlined className="project-nav-link__icon" />
          <span>Sessions</span>
        </Link>
      </p>
      <p>
        <Link className="project-nav-link" to={`/${path.split("/")[1]}/tracker`}>
          <DashboardOutlined className="project-nav-link__icon" />
          <span>Time Tracker</span>
        </Link>
      </p>
      <p>
        <Link className="project-nav-link" to={`/${path.split("/")[1]}/documents`}>
          <FileTextOutlined className="project-nav-link__icon" />
          <span>Docs</span>
        </Link>
      </p>
      <p>
        <Link className="project-nav-link" to={`/${path.split("/")[1]}/documents`}>
          <FileTextOutlined className="project-nav-link__icon" />
          <span>Report</span>
        </Link>
      </p>
    </div>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="project-navigation">
      <div className="project-nav-identity">
        <div className="project-nav-icon">
          <Avatar shape="square" size={40} icon={<ThunderboltOutlined />} />
        </div>
        <div className="project-nav-title">
          <span>{props.project ? props.project.currentProject.name : ""}</span>
          <a className="project-nav-title__detail" onClick={showModal}>
            Details
          </a>
        </div>
      </div>
      <nav className="project-nav">
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/overview`}>
            <LayoutOutlined className="project-nav-link__icon" />
            <span>Overview</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/tasks`}>
            <BarsOutlined className="project-nav-link__icon" />
            <span>Tasks</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/board`}>
            <ProjectOutlined className="project-nav-link__icon" />
            <span>Board</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/calendar`}>
            <CalendarOutlined className="project-nav-link__icon" />
            <span>Calendar</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/chat`}>
            <NumberOutlined className="project-nav-link__icon" />
            <span>Chat</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Popover className="popover" placement="bottom" content={moreContent} trigger="click">
            <Link className="project-nav-link" to="">
              <EllipsisOutlined className="project-nav-link__icon" style={{ fontSize: "25px" }} />
            </Link>
          </Popover>
        </li>
      </nav>
      <Modal title="Project Details" width="90%" centered visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div class="project-detail__icon-box" style={{ display: "flex" }}>
          <div class="icon-box" style={{ width: "100px", height: "100px", backgroundColor: "grey", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px", borderRadius: "12px", color: "white" }}>
            <ThunderboltOutlined />
          </div>
          <div className="icon-box__select">
            <Dropdown overlay={iconMenu} trigger={["click"]}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                Change Icon <DownOutlined />
              </a>
            </Dropdown>
            <a>Change Color</a>
          </div>
        </div>
        <Form>
          <Form.Item>
            <label>Project name</label>
            <Input value={projectName} />
          </Form.Item>
          <Form.Item>
            <label>Project description</label>
            <Input value={projectDescription} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps)(ProjectNavigation);
