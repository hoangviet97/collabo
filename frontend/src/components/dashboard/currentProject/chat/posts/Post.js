import React from "react";

const Post = (props) => {
  return <div style={{ backgroundColor: "#ced6e0", padding: "10px 20px", borderRadius: "10px", margin: "5px 0", maxWidth: "400px" }}>{props.children}</div>;
};

export default Post;
