import React, { useState } from "react";
import Container from "../utils/Container";
import Message from "./Message";
import { useSelector } from "react-redux";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import Editor from "./Editor";
import AvatarIcon from "../utils/AvatarIcon";
import NewMessage from "./NewMessage";
import MessageEditor from "../modal/MessageEditor";

const Messages = ({ children }) => {
  const { TextArea } = Input;
  const profile = useSelector((state) => state.auth.user.firstname);
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  const handleCancel = () => {
    setIsEditorVisible(false);
  };

  const handleOk = () => {
    setIsEditorVisible(false);
  };

  const openModal = () => {
    setIsEditorVisible(true);
  };

  return (
    <Container size="30">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="messages__editor" style={{ display: "flex", width: "50%" }}>
          <Avatar size={50}>
            <AvatarIcon name={profile} />
          </Avatar>
          <Input onClick={openModal} style={{ borderRadius: "20px", padding: "0 15px", marginLeft: "10px" }} />
        </div>
      </div>
      <MessageEditor visible={isEditorVisible} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

export default Messages;
