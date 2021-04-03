import React from "react";
import { connect } from "react-redux";
import { withRouter, matchPath } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProjectNavigation from "./ProjectNavigation";

const Topbar = (props) => {
  let path = window.location.pathname;

  console.log(isNaN(path.split("/")[1]));

  return (
    <div className="topbar">
      {isNaN(path.split("/")[1]) === false && path.split("/")[1].length === 8 ? <ProjectNavigation /> : null}
      <div class="topbar-profile">
        <Avatar size="large" icon={<UserOutlined />} />
        {props.auth.isAuthenticated && <span>{props.user.firstname}</span>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.auth.user,
    project: state.project
  };
};

export default connect(mapStateToProps, {})(withRouter(Topbar));
