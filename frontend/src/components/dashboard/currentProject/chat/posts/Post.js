import React from "react";
import AvatarIcon from "../../../../utils/AvatarIcon";
import { Avatar } from "antd";
import moment from "moment";

const Post = (props) => {
  const date = moment(props.post.created_at).format("lll");
  console.log(props.post);

  return (
    <div style={{ display: "flex" }}>
      <Avatar>
        <AvatarIcon name={props.post.name} />
      </Avatar>
      <div className="post-content" style={{ backgroundColor: "white", padding: "10px 15px", borderRadius: "10px", color: "black", marginLeft: "10px", marginBottom: "30px", flex: "1" }}>
        <p>
          <span style={{ fontWeight: "400" }}>{props.post.name}</span> &nbsp; <span style={{ fontSize: "12px" }}>{date}</span>
        </p>
        {props.post.text}
      </div>
    </div>
  );
};

export default Post;
