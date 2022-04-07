import React from "react";
import { useSelector } from "react-redux";
import AvatarIcon from "../utils/AvatarIcon";
import { Input, Avatar } from "antd";

const NewMessage = () => {
  const profile = useSelector((state) => state.auth.user.firstname);

  return (
    <div style={{ display: "flex", width: "50%" }}>
      <Avatar size={50}>
        <AvatarIcon name={profile} />
      </Avatar>
      <Input style={{ borderRadius: "20px", padding: "0 15px", marginLeft: "10px" }} />
    </div>
  );
};

export default NewMessage;
