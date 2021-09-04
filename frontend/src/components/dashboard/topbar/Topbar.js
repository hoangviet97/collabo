import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ProjectNavigation from "./ProjectNavigation";
import AvatarIcon from "../../utils/AvatarIcon";
import { Link } from "react-router-dom";

const Topbar = (props) => {
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
          <AvatarIcon name={props.user.firstname} />
        </Avatar>
        {props.auth.isAuthenticated && (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <span className="topbar__profile-name">{props.user.firstname}</span>
          </Dropdown>
        )}
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
