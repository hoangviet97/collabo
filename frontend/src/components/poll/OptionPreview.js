import React from "react";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";

const OptionPreview = ({ text }) => {
  return (
    <div style={{ backgroundColor: "wheat", padding: "6px 10px", borderRadius: "10px", marginBottom: "5px" }}>
      <span>{text}</span>
    </div>
  );
};

export default OptionPreview;
