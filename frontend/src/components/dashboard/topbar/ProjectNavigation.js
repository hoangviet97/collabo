import React, { useEffect } from "react";
import { Avatar, Popover } from "antd";
import { ThunderboltOutlined, CalendarOutlined, InfoCircleOutlined, FileTextOutlined, TeamOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProjectNavigation = (props) => {
  let path = window.location.pathname;

  const moreContent = (
    <div>
      <p>
        <Link to={`/${path.split("/")[1]}/members`}>
          <TeamOutlined style={{ color: "grey" }} />
          <span>Project Members</span>
        </Link>
      </p>
      <p>
        <Link to={`/${path.split("/")[1]}/documents`}>
          <FileTextOutlined style={{ color: "grey" }} />
          <span>Docs</span>
        </Link>
      </p>
      <p>
        <Link to={`/${path.split("/")[1]}/documents`}>
          <FileTextOutlined style={{ color: "grey" }} />
          <span>Project Management</span>
        </Link>
      </p>
      <p>
        <Link to={`/${path.split("/")[1]}/documents`}>
          <FileTextOutlined style={{ color: "grey" }} />
          <span>Report</span>
        </Link>
      </p>
    </div>
  );

  return (
    <div className="project-navigation">
      <div className="project-nav-identity">
        <div className="project-nav-icon">
          <Avatar shape="square" size={40} icon={<ThunderboltOutlined />} />
        </div>
        <div className="project-nav-title">
          <span>{props.project.currentProject.name}</span>
          <a className="project-nav-title__detail">Details</a>
        </div>
      </div>
      <nav className="project-nav">
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/overview`}>
            <LayoutOutlined style={{ color: "grey" }} />
            <span>Overview</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/tasks`}>
            <BarsOutlined style={{ color: "grey" }} />
            <span>Tasks</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/board`}>
            <ProjectOutlined style={{ color: "grey" }} />
            <span>Board</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/calendar`}>
            <CalendarOutlined style={{ color: "grey" }} />
            <span>Calendar</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to={`/${path.split("/")[1]}/chat`}>
            <NumberOutlined style={{ color: "grey" }} />
            <span>Chat</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Popover placement="bottom" content={moreContent} trigger="click">
            <Link className="project-nav-link" to="">
              <EllipsisOutlined style={{ color: "black", fontSize: "25px" }} />
            </Link>
          </Popover>
        </li>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps)(ProjectNavigation);
