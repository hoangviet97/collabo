import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Topbar = ({ auth, user }) => {
  return (
    <div className="topbar">
      <div className="topbar-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        {auth.isAuthenticated && <span>{user.firstname}</span>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, {})(Topbar);
