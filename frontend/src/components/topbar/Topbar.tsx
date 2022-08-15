import React, { FC, useEffect } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Avatar, Menu, Dropdown } from "antd";
import ProjectNavigation from "./ProjectNavigation";
import AvatarIcon from "../utils/AvatarIcon";
import { Link } from "react-router-dom";
import color from "../../styles/abstract/variables.module.scss";

const Topbar: React.FunctionComponent = () => {
  const auth = useSelector((state: RootStateOrAny) => state.auth);
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  let path = window.location.pathname;
  let pathValue: string = path.split("/")[1];

  return (
    <div className="topbar">
      {pathValue.length === 8 && /^\d+$/.test(pathValue) ? <ProjectNavigation /> : null}
      <div className="topbar__profile">
        <Avatar size="large" style={{ backgroundColor: user.color === null || user.color.length < 1 ? color.normal_orange : user.color }}>
          <AvatarIcon firstname={user.firstname} lastname={user.lastname} />
        </Avatar>
        {auth.isAuthenticated && <span className="topbar__profile-name">{user.firstname}</span>}
      </div>
    </div>
  );
};

export default Topbar;
