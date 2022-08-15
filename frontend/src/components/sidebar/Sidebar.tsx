import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { logout } from "../../actions/auth";
import { ImportOutlined, BellOutlined, HomeOutlined, SettingOutlined, ProfileOutlined } from "@ant-design/icons";
import { Badge } from "antd";

const Sidebar: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((state: RootStateOrAny) => state.invitation.invitations);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">c.</div>
        <nav className="side-nav">
          <div>
            <Link className="side-nav__link" to="/">
              <HomeOutlined className="side-nav__icon" />
            </Link>
          </div>
          <div>
            <Link className="side-nav__link" to="/my-tasks">
              <ProfileOutlined className="side-nav__icon" />
            </Link>
          </div>
          <div>
            <Link className="side-nav__link" to="/notify">
              <Badge count={invitations.length}>
                <BellOutlined className="side-nav__icon" />
              </Badge>
            </Link>
          </div>
          <div>
            <Link className="side-nav__link" to="/settings">
              <SettingOutlined className="side-nav__icon" />
            </Link>
          </div>
        </nav>
      </div>
      <div className="side-nav__profile">
        <a onClick={logoutHandler}>
          <ImportOutlined className="side-nav__logout" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
