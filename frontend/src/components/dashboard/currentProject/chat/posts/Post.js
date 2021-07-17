import React from "react";

const Post = (props) => {
  return <div style={{ clear: "both", float: "right", backgroundColor: "grey", padding: "10px 20px", borderRadius: "10px", color: "white", margin: "5px 0" }}>{props.children}</div>;
};

export default Post;
