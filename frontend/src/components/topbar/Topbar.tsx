import React, { FC, useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Avatar, Menu, Dropdown } from "antd";
import ProjectNavigation from "./ProjectNavigation";
import AvatarIcon from "../utils/AvatarIcon";
import { Link } from "react-router-dom";

const Topbar = () => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
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
      {path.split("/")[1].length === 8 ? <ProjectNavigation /> : null}
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

export default Topbar;
