import React from "react";
import AvatarIcon from "../utils/AvatarIcon";
import { Avatar } from "antd";
import moment from "moment";

const Reply = ({ data }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <div style={{ marginRight: "12px" }}>
        <Avatar size={40}>
          <AvatarIcon name={data.firstname} />
        </Avatar>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <span style={{ fontWeight: "bold", marginRight: "10px" }}>
            {data.firstname} {data.lastname}
          </span>
          <span style={{ color: "#636e72", fontSize: "10px" }}>{moment(data.created_at).calendar()}</span>
        </div>
        <span>{data.text}</span>
      </div>
    </div>
  );
};

export default Reply;
