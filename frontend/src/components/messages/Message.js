import React from "react";
import { Comment, Avatar } from "antd";

const Message = ({ text, name }) => {
  return (
    <div style={{ border: "0.7px solid grey", width: "70%", padding: "15px", borderRadius: "12px", marginBottom: "40px", backgroundColor: "white" }}>
      <Comment actions={[<span key="comment-nested-reply-to">Reply to</span>]} author={<a>{name}</a>} avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />} content={<p>{text}</p>}></Comment>
    </div>
  );
};

export default Message;
