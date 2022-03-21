import React from "react";
import { Tag, Divider } from "antd";

const TagGroup = ({ title, tags }) => {
  return (
    <div style={{ margin: "18px 0" }}>
      <Divider />
      <h2 style={{ fontSize: "35px", color: "grey" }}>{title}</h2>
      {tags.map((i) => (
        <Tag color="cyan" style={{ fontSize: "18px", padding: "6px" }} closable>
          #{i.name}
        </Tag>
      ))}
    </div>
  );
};

export default TagGroup;
