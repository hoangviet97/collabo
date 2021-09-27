import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import ProjectNavigation from "./ProjectNavigation";
import AvatarIcon from "../utils/AvatarIcon";
import { Link } from "react-router-dom";

const Topbar = ({ auth, user }) => {
  let path = window.location.pathname;

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="topbar">
      {isNaN(path.split("/")[1]) === false && path.split("/")[1].length === 8 ? <ProjectNavigation /> : null}
      <div className="topbar__profile">
        <Avatar size="large">
          <AvatarIcon name={user.firstname} />
        </Avatar>
        {auth.isAuthenticated && (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <span className="topbar__profile-name">{user.firstname}</span>
          </Dropdown>
        )}
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

export default connect(mapStateToProps, {})(withRouter(Topbar));
