import React from "react";
import { Link } from "react-router-dom";
import { Popover, Menu } from "antd";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

import { SettingOutlined, BellOutlined, CarryOutOutlined, HomeOutlined, FolderOutlined, MessageOutlined } from "@ant-design/icons";

const Sidebar = (props) => {
  const text = <span>Title</span>;

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item>
        <a onClick={props.logout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <aside className="sidebar">
      <div className="logo-box">
        <span className="logo">c.</span>
      </div>
      <nav className="side-nav">
        <Link className="side-nav__link" to="/">
          <HomeOutlined className="side-nav__icon" />
        </Link>
        <Link className="side-nav__link" to="/projects">
          <FolderOutlined className="side-nav__icon" />
        </Link>
        <Link className="side-nav__link" to="/tasks">
          <CarryOutOutlined className="side-nav__icon" />
        </Link>
        <Link className="side-nav__link" to="">
          <MessageOutlined className="side-nav__icon" />
        </Link>
        <Link className="side-nav__link" to="">
          <BellOutlined className="side-nav__icon" />
        </Link>
      </nav>
      <div className="side-nav__profile">
        <Popover placement="rightBottom" content={menu} trigger="click">
          <SettingOutlined style={{ fontSize: "25px", margin: "20px 0", color: "#383e42" }} />
        </Popover>
      </div>
    </aside>
  );
};

export default connect(null, { logout })(Sidebar);
