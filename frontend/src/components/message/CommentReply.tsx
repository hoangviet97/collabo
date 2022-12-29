import React, { useState, FC } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface Props {
  show: any;
  reply: any;
}

const CommentReply: FC<Props> = ({ show, reply }) => {
  const [text, setText] = useState<string>("");

  return (
    <div style={{ display: "flex" }}>
      <Input autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your reply" />
      <Button type="primary" onClick={() => reply(text)} style={{ padding: "0 20px", marginLeft: "7px" }}>
        <SendOutlined />
      </Button>
    </div>
  );
};

export default CommentReply;
