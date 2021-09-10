import { LeftCircleFilled } from "@ant-design/icons";
import React from "react";
import AvatarIcon from "../../../../utils/AvatarIcon";
import { Avatar } from "antd";
import moment from "moment";

function MyPost(props) {
  const date = moment(props.post.created_at).format("lll");

  return (
    <div style={{ display: "flex" }}>
      <Avatar>
        <AvatarIcon name={props.post.name} />
      </Avatar>
      <div className="post-content" style={{ backgroundColor: "white", border: "0.7px solid #7ed6df", padding: "10px 15px", borderRadius: "10px", color: "black", marginLeft: "10px", marginBottom: "30px", flex: "1" }}>
        <p>
          <span style={{ fontWeight: "400" }}>{props.post.name}</span> &nbsp; <span style={{ fontSize: "12px" }}>{date}</span>
        </p>
        {props.post.text}
      </div>
    </div>
  );
}

export default MyPost;
