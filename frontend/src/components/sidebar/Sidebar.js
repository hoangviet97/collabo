import React, { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { ImportOutlined, BellOutlined, HomeOutlined } from "@ant-design/icons";

const Sidebar = ({ logout }) => {
  const dispatch = useDispatch();
  const invitations = useSelector((state) => state.invitation.invitations);
  const [invitationNum, setInvitationNum] = useState([]);

  useEffect(() => {
    setInvitationNum(invitations.filter((item) => item.seen === 0));
  }, [invitations]);

  return (
    <div className="sidebar">
      <a className="sidebar__logo">c.</a>
      <nav className="side-nav">
        <Link className="side-nav__link" to="/">
          <HomeOutlined className="side-nav__icon" />
        </Link>
        <Link className="side-nav__link" to="/notify">
          <BellOutlined className="side-nav__icon" />
        </Link>
      </nav>
      <div className="side-nav__profile">
        <a onClick={logout}>
          <ImportOutlined style={{ fontSize: "30px", color: "white" }} />
        </a>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Sidebar);
