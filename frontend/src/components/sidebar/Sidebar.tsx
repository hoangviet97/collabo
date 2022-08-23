import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { logout } from "../../actions/auth";
import { ImportOutlined, BellOutlined, HomeOutlined, SettingOutlined, ProfileOutlined } from "@ant-design/icons";
import { Badge, Tooltip, Avatar } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import color from "../../styles/abstract/variables.module.scss";

const Sidebar: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((state: RootStateOrAny) => state.invitation.invitations);
  const user = useSelector((state: RootStateOrAny) => state.auth.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">c.</div>
        <nav className="side-nav">
          <div style={{ textAlign: "center" }}>
            <Tooltip placement="right" title="Home">
              <Link className="side-nav__link" to="/">
                <HomeOutlined className="side-nav__icon" />
              </Link>
            </Tooltip>
          </div>
          <div style={{ textAlign: "center" }}>
            <Tooltip placement="right" title="My Tasks">
              <Link className="side-nav__link" to="/my-tasks">
                <ProfileOutlined className="side-nav__icon" />
              </Link>
            </Tooltip>
          </div>
          <div style={{ textAlign: "center" }}>
            <Tooltip placement="right" title="Invitations">
              <Link className="side-nav__link" to="/notify">
                <Badge count={invitations.length}>
                  <BellOutlined className="side-nav__icon" />
                </Badge>
              </Link>
            </Tooltip>
          </div>
          <div style={{ textAlign: "center" }}>
            <Tooltip placement="right" title="Settings">
              <Link className="side-nav__link" to="/settings">
                <SettingOutlined className="side-nav__icon" />
              </Link>
            </Tooltip>
          </div>
        </nav>
      </div>
      <div className="sidebar__bottom">
        <div className="sidebar__bottom-user">
          <Tooltip placement="right" title={`${user.firstname} ${user.lastname}`}>
            <Avatar size="large" style={{ backgroundColor: user.color === null || user.color.length < 1 ? color.normal_orange : user.color, marginBottom: "20px" }}>
              <AvatarIcon firstname={user.firstname} lastname={user.lastname} />
            </Avatar>
          </Tooltip>
        </div>
        <Tooltip placement="right" title="Logout">
          <a onClick={logoutHandler}>
            <ImportOutlined className="side-nav__logout" />
          </a>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
