import React from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Topbar = (props) => {
  return (
    <div className="topbar">
      <div class="topbar-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        <span>{!props.loading ? props.user.firstname : null}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {})(Topbar);
