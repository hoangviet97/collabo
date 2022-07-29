import React, { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { logout } from "../../actions/auth";
import { ImportOutlined, BellOutlined, HomeOutlined, SettingOutlined, ProfileOutlined } from "@ant-design/icons";
import { Badge } from "antd";

interface Props {
  unread: number;
}

const Sidebar: FC<Props> = ({ unread }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">c.</div>
        <nav className="side-nav">
          <Link className="side-nav__link" to="/">
            <HomeOutlined className="side-nav__icon" />
          </Link>
          <Link className="side-nav__link" to="/my-tasks">
            <ProfileOutlined className="side-nav__icon" />
          </Link>
          <Link className="side-nav__link" to="/notify">
            <Badge count={unread}>
              <BellOutlined className="side-nav__icon" />
            </Badge>
          </Link>
          <Link className="side-nav__link" to="/settings">
            <SettingOutlined className="side-nav__icon" />
          </Link>
        </nav>
      </div>
      <div className="side-nav__profile">
        <a onClick={logoutHandler}>
          <ImportOutlined style={{ fontSize: "30px", marginBottom: "20px", color: "#b4babe" }} />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
