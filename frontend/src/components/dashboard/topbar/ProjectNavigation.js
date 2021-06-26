import React from "react";
import { Avatar, Popover } from "antd";
import { ThunderboltOutlined, CalendarOutlined, FileTextOutlined, TeamOutlined, FundProjectionScreenOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProjectNavigation = (props) => {
  let path = window.location.pathname;

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

  return (
    <div className="project-navigation">
      <div className="project-nav-identity">
        <div className="project-nav-icon">
          <Avatar shape="square" size={40} icon={<ThunderboltOutlined />} />
        </div>
        <div className="project-nav-title">
          <span>{props.project ? props.project.currentProject.name : ""}</span>
          <a className="project-nav-title__detail">Details</a>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps)(ProjectNavigation);
