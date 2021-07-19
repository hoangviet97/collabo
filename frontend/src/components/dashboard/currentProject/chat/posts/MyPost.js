import { LeftCircleFilled } from "@ant-design/icons";
import React from "react";
import AvatarIcon from "../../../../utils/AvatarIcon";
import { Avatar } from "antd";

function MyPost(props) {
  return (
    <div style={{ display: "flex" }}>
      <Avatar>
        <AvatarIcon name={props.post.name} />
      </Avatar>
      <div style={{ clear: "both", float: "left", backgroundColor: "#3385f7", padding: "10px 20px", borderRadius: "10px", color: "white", marginLeft: "10px", marginBottom: "5px" }}>{props.post.text}</div>
    </div>
  );
}

export default MyPost;
