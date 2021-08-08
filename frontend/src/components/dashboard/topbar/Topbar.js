import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProjectNavigation from "./ProjectNavigation";
import AvatarIcon from "../../utils/AvatarIcon";

const Topbar = (props) => {
  let path = window.location.pathname;

  return (
    <div className="topbar">
      {isNaN(path.split("/")[1]) === false && path.split("/")[1].length === 8 ? <ProjectNavigation /> : null}
      <div className="topbar-profile" style={{ position: "absolute", right: "30px" }}>
        <Avatar size="large">
          <AvatarIcon name={props.user.firstname} />
        </Avatar>
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
