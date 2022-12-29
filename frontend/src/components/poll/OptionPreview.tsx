import React, { FC } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface Props {
  text: string;
  removeOption: (text: string) => void;
}

const OptionPreview: FC<Props> = ({ text, removeOption }) => {
  return (
    <div className="option__preview">
      <span>{text}</span>
      <Button style={{ color: "white" }} type="link" icon={<CloseOutlined />} onClick={() => removeOption(text)}></Button>
    </div>
  );
};

export default OptionPreview;
