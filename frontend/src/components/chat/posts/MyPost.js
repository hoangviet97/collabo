import React, { useEffect, useState } from "react";
import AvatarIcon from "../../utils/AvatarIcon";
import { Comment, Tooltip, Avatar } from "antd";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from "@ant-design/icons";
import moment from "moment";

function MyPost({ post }) {
  const date = moment(post.created_at).format("lll");
  const [text, setText] = useState("");

  useEffect(() => {
    if (post.text !== "") {
      let regex = /@\[.+?\]\(.+?\)/gm;
      let displayRegex = /@\[.+?\]/g;
      let idRegex = /\(.+?\)/g;
      let matches = post.text.match(regex);
      let arr = [];
      matches &&
        matches.forEach((m) => {
          let id = m.match(idRegex)[0].replace("(", "").replace(")", "");
          let display = m.match(displayRegex)[0].replace("@[", "").replace("]", "");

          arr.push({ id: id, display: display });
        });
      let newComment = post.text.split(regex);
      let output = "";
      for (let i = 0; i < newComment.length; i++) {
        const c = newComment[i];
        if (i === newComment.length - 1) output += c;
        else output += c + `<a>${arr[i].display}</a>`;
      }
      setText(output);
    }
  }, [post]);

  return (
    <div style={{ display: "flex" }}>
      <Avatar>
        <AvatarIcon name={post.name} />
      </Avatar>
      <div className="post__content">
        <p>
          <span style={{ fontWeight: "400" }}>{post.name}</span> &nbsp; <span style={{ fontSize: "12px" }}>{date}</span>
        </p>

        <p
          className="d-inline comment-paragraph-text"
          dangerouslySetInnerHTML={{
            __html: text.replace(/\n\r?/g, "<br />")
          }}
        />
      </div>
    </div>
  );
}

export default MyPost;
