import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Topbar = () => {
  return (
    <div className="topbar">
      <div class="topbar-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        <span>Alexander</span>
      </div>
    </div>
  );
};

export default Topbar;
