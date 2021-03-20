import React from "react";
import { Link } from "react-router-dom";
import { Popover, Badge, Tooltip } from "antd";

import { SettingOutlined, BellOutlined, CarryOutOutlined, HomeOutlined, FolderOutlined, MessageOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const text = <span>Title</span>;
  const content = (
    <div>
      <p>Logout</p>
      <p>Content</p>
    </div>
  );

  return (
    <aside className="sidebar">
      <div class="logo-box">
        <span className="logo">c.</span>
      </div>
      <nav className="side-nav">
        <Link to="/">
          <Tooltip placement="right" title="Home">
            <HomeOutlined style={{ fontSize: "25px", color: "#383e42" }} />
          </Tooltip>
        </Link>
        <Link to="/projects">
          <Tooltip placement="right" title="Projects">
            <FolderOutlined style={{ fontSize: "25px", color: "#383e42" }} />
          </Tooltip>
        </Link>
        <Link to="/tasks">
          <Tooltip placement="right" title="Tasks">
            <CarryOutOutlined style={{ fontSize: "25px", color: "#383e42" }} />
          </Tooltip>
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
