import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Popover, Menu, Badge } from "antd";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

import { SettingOutlined, BellOutlined, CarryOutOutlined, HomeOutlined, FolderOutlined, MessageOutlined } from "@ant-design/icons";

const Sidebar = (props) => {
  const text = <span>Title</span>;

  const [invitationNum, setInvitationNum] = useState([]);

  useEffect(() => {
    setInvitationNum(props.invitations.filter((item) => item.seen === 0));
  }, [props.invitations]);

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
    <div className="sidebar">
      <a className="sidebar__logo">c.</a>
      <nav className="side-nav">
        <Link className="side-nav__link" to="/">
          <HomeOutlined className="side-nav__icon" />
        </Link>
        <Link className="side-nav__link" to="/tasks">
          <CarryOutOutlined className="side-nav__icon" />
        </Link>
        <Link className="side-nav__link" to="/notifications">
          <Badge count={invitationNum.length}>
            <BellOutlined className="side-nav__icon" />
          </Badge>
        </Link>
      </nav>
      <div className="side-nav__profile">
        <Popover placement="rightBottom" content={menu} trigger="click">
          <SettingOutlined style={{ fontSize: "25px", margin: "20px 0", color: "#383e42" }} />
        </Popover>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  invitations: state.invitation.invitations
});

export default connect(mapStateToProps, { logout })(Sidebar);
