import React from "react";
import { connect } from "react-redux";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Topbar = (props) => {

  return (
    <div className="topbar">
      <div class="topbar-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        <span>{props.user.firstname}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {})(Topbar);

