import React from "react";
import { Link } from "react-router-dom";
import { Popover, Badge, Tooltip } from "antd";

import { SettingOutlined, BellOutlined, CarryOutOutlined, HomeOutlined, FolderOutlined, MessageOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const text = <span>Title</span>;
  const content = (
    <div>
      <Link to="/settings">My Settings</Link>
      <p>Content</p>
    </div>
  );

  return (
    <aside className="sidebar">
      <div className="logo-box">
        <span className="logo">c.</span>
      </div>
      <nav className="side-nav">
        <Link to="/">
          <HomeOutlined style={{ fontSize: "25px", color: "#383e42" }} />
        </Link>
        <Link to="/projects">
          <FolderOutlined style={{ fontSize: "25px", color: "#383e42" }} />
        </Link>
        <Link to="/tasks">
          <CarryOutOutlined style={{ fontSize: "25px", color: "#383e42" }} />
        </Link>
        <Link to="">
          <MessageOutlined style={{ fontSize: "25px", color: "#383e42" }} />
        </Link>
        <Link to="">
          <Badge count={899}>
            <BellOutlined style={{ fontSize: "25px", color: "#383e42" }} />
          </Badge>
        </Link>
      </nav>
      <div className="side-profile">
        <Popover placement="rightBottom" title={text} content={content} trigger="click">
          <SettingOutlined style={{ fontSize: "25px", margin: "20px 0", color: "#383e42" }} />
        </Popover>
      </div>
    </aside>
  );
};

export default Sidebar;
