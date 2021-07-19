import React from "react";
import AvatarIcon from "../../../../utils/AvatarIcon";
import { Avatar } from "antd";

const Post = (props) => {
  return (
    <div style={{ display: "flex" }}>
      <Avatar>
        <AvatarIcon name={props.post.name} />
      </Avatar>
      <div style={{ clear: "both", float: "left", backgroundColor: "#6a6c6e", padding: "10px 20px", borderRadius: "10px", color: "white", marginLeft: "10px", marginBottom: "5px" }}>{props.post.text}</div>
    </div>
  );
};

export default Post;
