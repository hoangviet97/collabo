import React from "react";
import { Avatar } from "antd";
import { ThunderboltOutlined, CalendarOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProjectNavigation = () => {
  return (
    <div className="project-navigation">
      <Avatar shape="square" size={45} icon={<ThunderboltOutlined />} />
      <ul className="project-nav">
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <LayoutOutlined />
            <span>Overview</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <BarsOutlined />
            <span>Tasks</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <ProjectOutlined />
            <span>Board</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <CalendarOutlined />
            <span>Calendar</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <NumberOutlined />
            <span>Chat</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProjectNavigation;
