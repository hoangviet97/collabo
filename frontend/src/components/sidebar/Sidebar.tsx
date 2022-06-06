import React, { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { logout } from "../../actions/auth";
import { ImportOutlined, BellOutlined, HomeOutlined } from "@ant-design/icons";

const Sidebar = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((state: RootStateOrAny) => state.invitation.invitations);
  const [invitationNum, setInvitationNum] = useState([]);

  useEffect(() => {
    setInvitationNum(invitations.filter((item: any) => item.seen === 0));
  }, [invitations]);

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
          <Link className="side-nav__link" to="/notify">
            <BellOutlined className="side-nav__icon" />
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
