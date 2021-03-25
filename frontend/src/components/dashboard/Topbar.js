import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import authReducer from "../../reducers/auth";

const Topbar = ({ auth }) => {
  return (
    <div className="topbar">
      <div className="topbar-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        {auth.isAuthenticated && <span>{auth.user.email}</span>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {})(Topbar);
