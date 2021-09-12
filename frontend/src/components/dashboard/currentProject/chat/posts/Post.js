import React from "react";
import AvatarIcon from "../../../../utils/AvatarIcon";
import { Avatar } from "antd";
import moment from "moment";

const Post = ({ post }) => {
  const date = moment(post.created_at).format("lll");

  return (
    <div style={{ display: "flex" }}>
      <Avatar>
        <AvatarIcon name={post.name} />
      </Avatar>
      <div className="post__content">
        <p>
          <span style={{ fontWeight: "400" }}>{post.name}</span> &nbsp; <span style={{ fontSize: "12px" }}>{date}</span>
        </p>
        {post.text}
      </div>
    </div>
  );
};

export default Post;
