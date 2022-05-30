import React, { FC } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface Props {
  text: string;
  removeOption: any;
}

const OptionPreview: FC<Props> = ({ text, removeOption }) => {
  return (
    <div style={{ backgroundColor: "wheat", padding: "6px 10px", borderRadius: "10px", marginBottom: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{text}</span>
      <Button style={{ color: "white" }} type="link" icon={<CloseOutlined />} onClick={() => removeOption(text)}></Button>
    </div>
  );
};

export default OptionPreview;
