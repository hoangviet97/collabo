import React from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const OptionPreview = ({ text, removeOption }) => {
  return (
    <div style={{ backgroundColor: "wheat", padding: "6px 10px", borderRadius: "10px", marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{text}</span>
      <Button style={{ color: "white" }} type="link" icon={<CloseOutlined />} onClick={() => removeOption(text)}></Button>
    </div>
  );
};

export default OptionPreview;
