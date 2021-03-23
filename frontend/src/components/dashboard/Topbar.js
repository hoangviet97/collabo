import React from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Topbar = ({ user }) => {
  return (
    <div className="topbar">
      <div className="topbar-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        <span></span>
      </div>
    </div>
  );
};

export default Topbar;
