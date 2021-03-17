import React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "antd";
import { UserOutlined, SettingOutlined, BellOutlined, CarryOutOutlined, HomeOutlined, FolderOutlined, MessageOutlined } from "@ant-design/icons";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div class="logo-box">
        <span className="logo">c.</span>
      </div>
      <nav className="side-nav">
        <Link to="">
          <HomeOutlined style={{ fontSize: "25px", padding: "20px 0", color: "#383e42" }} />
        </Link>
        <Link to="">
          <FolderOutlined style={{ fontSize: "25px", padding: "20px 0", color: "#383e42" }} />
        </Link>
        <Link to="">
          <CarryOutOutlined style={{ fontSize: "25px", padding: "20px 0", color: "#383e42" }} />
        </Link>
        <Link to="">
          <MessageOutlined style={{ fontSize: "25px", padding: "20px 0", color: "#383e42" }} />
        </Link>
        <Link to="">
          <BellOutlined style={{ fontSize: "25px", padding: "20px 0", color: "#383e42" }} />
        </Link>
      </nav>
      <div className="side-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        <SettingOutlined style={{ fontSize: "25px", padding: "20px 0", color: "#383e42" }} />
      </div>
    </aside>
  );
};

export default Sidebar;
