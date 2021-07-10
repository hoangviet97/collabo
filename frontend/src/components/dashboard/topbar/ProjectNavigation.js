import React, { useState, useEffect } from "react";
import { Avatar, Popover, Modal, Form, Input, Dropdown, Menu, Button } from "antd";
import { ThunderboltOutlined, TrophyOutlined, ShareAltOutlined, FireOutlined, DingtalkOutlined, CrownOutlined, CalendarOutlined, DownOutlined, FileTextOutlined, DashboardOutlined, TeamOutlined, FundProjectionScreenOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateColor } from "../../../actions/project";

const ProjectNavigation = (props) => {
  let path = window.location.pathname;

  const [isModalVisible, setIsModalVisible] = useState(false);
  let ic;
  const [projectName, setProjectName] = useState("");
  const [ProjectIcon, setProjectIcon] = useState("");
  const [showIconTab, setIconTab] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");
  const iconSet = [
    { name: "ThunderboltOutlined", icon: <ThunderboltOutlined /> },
    { name: "TrophyOutlined", icon: <TrophyOutlined /> },
    { name: "ShareAltOutlined", icon: <ShareAltOutlined /> },
    { name: "FireOutlined", icon: <FireOutlined /> },
    { name: "DingtalkOutlined", icon: <DingtalkOutlined /> },
    { name: "CrownOutlined", icon: <CrownOutlined /> }
  ];
  const colorSet = ["#f9ca24", "#f0932b", "#eb4d4b", "#badc58", "#7ed6df", "#e056fd", "#686de0", "#30336b", "#535c68"];
  const [iconColorSelection, setIconColorSelection] = useState(colorSet[0]);

  useEffect(() => {
    setProjectName(props.project.currentProject.name);
    setProjectDescription(props.project.currentProject.description);
  }, [props]);

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

  const handleIconColor = (color) => {
    setIconColorSelection(color);
    props.updateColor({ id: props.currentProject.id, color: color });
  };

  return (
    <div className="project-navigation">
      <div className="project-nav-identity">
        <div className="project-nav-icon">
          <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: props.project.currentProject.color !== null ? props.project.currentProject.color : "grey" }}></div>
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
        <div class="project-detail__icon-box" style={{ display: "flex", gap: "10px" }}>
          <div class="icon-box" style={{ width: "100px", height: "100px", backgroundColor: iconColorSelection, display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px", borderRadius: "12px", color: "white" }}>
            <ThunderboltOutlined />
          </div>
          <div className="icon-box__select">
            <Button onClick={() => setIconTab(true)}>Change Icon</Button>
            {showIconTab && (
              <div className="icon-custombox" style={{ position: "absolute", marginTop: "5px", zIndex: "99999", backgroundColor: "white", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", padding: "15px 15px", borderRadius: "12px", width: "350px" }}>
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                  {iconSet.map((icon) => (
                    <div className="icon-custombox-item" style={{ fontSize: "30px" }}>
                      {icon.icon}
                    </div>
                  ))}
                </div>
                <div class="icon-colorbox" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {colorSet.map((item, index) => (
                    <div onClick={() => handleIconColor(item)} key={index} style={{ backgroundColor: item, width: "50px", height: "50px", borderRadius: "12px" }}></div>
                  ))}
                </div>
              </div>
            )}
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
  project: state.project,
  currentProject: state.project.currentProject
});

export default connect(mapStateToProps, { updateColor })(ProjectNavigation);
