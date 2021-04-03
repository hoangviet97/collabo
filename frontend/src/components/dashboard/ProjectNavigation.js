import React from "react";
import { Avatar } from "antd";
import { ThunderboltOutlined, CalendarOutlined, NumberOutlined, BarsOutlined, LayoutOutlined, ProjectOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProjectNavigation = () => {
  return (
    <div className="project-navigation">
      <div className="project-nav-icon">
        <Avatar shape="square" size={40} icon={<ThunderboltOutlined />} />
      </div>
      <nav className="project-nav">
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <LayoutOutlined style={{ color: "grey" }} />
            <span>Overview</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <BarsOutlined style={{ color: "grey" }} />
            <span>Tasks</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <ProjectOutlined style={{ color: "grey" }} />
            <span>Board</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <CalendarOutlined style={{ color: "grey" }} />
            <span>Calendar</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <NumberOutlined style={{ color: "grey" }} />
            <span>Chat</span>
          </Link>
        </li>
        <li className="project-nav-item">
          <Link className="project-nav-link" to="">
            <EllipsisOutlined style={{ color: "black", fontSize: "25px" }} />
          </Link>
        </li>
      </nav>
    </div>
  );
};

export default ProjectNavigation;
