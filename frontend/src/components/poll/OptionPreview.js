import React from "react";
import { Button } from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";

const OptionPreview = ({ text, removeOption }) => {
  return (
    <div style={{ backgroundColor: "wheat", padding: "6px 10px", borderRadius: "10px", marginBottom: "5px" }}>
      <span>{text}</span>
      <Button onClick={() => removeOption(text)}>Delete</Button>
    </div>
  );
};

export default OptionPreview;
