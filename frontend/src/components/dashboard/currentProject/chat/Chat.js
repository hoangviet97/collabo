import React, { useState, useEffect } from "react";
import Container from "../../../utils/Container";
import { Input } from "antd";
import io from "socket.io-client";

const Chat = (props) => {
  useEffect(() => {
    const socket = io("http://localhost:9000/chat");
  }, []);

  return (
    <Container size="30">
      <div className="chat-window"></div>
      <div className="chat-input-container">
        <Input width="30" />
      </div>
    </Container>
  );
};

export default Chat;
