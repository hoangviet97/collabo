import React from "react";
import { Avatar, Popover } from "antd";
import { ThunderboltOutlined, CalendarOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const ProjectNavigation = () => {
  let path = window.location.pathname;

  const moreContent = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div className="project-navigation">
      <div className="project-nav-icon">
        <Avatar shape="square" size={40} icon={<ThunderboltOutlined />} />
      </div>
      <div></div>
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

export default ProjectNavigation;
