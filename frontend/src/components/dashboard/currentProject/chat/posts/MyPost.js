import { LeftCircleFilled } from "@ant-design/icons";
import React from "react";

function MyPost(props) {
  return <div style={{ clear: "both", float: "left", backgroundColor: "#1e90ff", padding: "10px 20px", borderRadius: "10px", color: "white", margin: "5px 0" }}>{props.children}</div>;
}

export default MyPost;
