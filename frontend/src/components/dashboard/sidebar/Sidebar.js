import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button } from "antd";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

import { ImportOutlined, BellOutlined, CarryOutOutlined, HomeOutlined } from "@ant-design/icons";

const Sidebar = (props) => {
  const text = <span>Title</span>;

  const [invitationNum, setInvitationNum] = useState([]);

  useEffect(() => {
    setInvitationNum(props.invitations.filter((item) => item.seen === 0));
  }, [props.invitations]);

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
        <a onClick={props.logout}>
          <ImportOutlined style={{ fontSize: "30px", color: "white" }} />
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  invitations: state.invitation.invitations
});

export default connect(mapStateToProps, { logout })(Sidebar);
