import React, { useState, useEffect, useRef } from "react";
import Container from "../../../utils/Container";
import MyPost from "./posts/MyPost";
import Post from "./posts/Post";
import { Input, Button } from "antd";
import io from "socket.io-client";

const socket = io("http://localhost:9000/chat");

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [myId, setMyId] = useState("");

  useEffect(() => {
    socket.on("your id", (id) => {
      setMyId(id);
    });

    socket.on("msg", (body) => {
      console.log(body);
      receivedMsg(body);
    });

    socket.emit("hi", "hi...");

    socket.on("connect", () => {
      socket.emit("join", "fffff");
    });

    socket.on("get join", (data) => {
      console.log(data);
    });
  }, []);

  const receivedMsg = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  const sendMsg = (e) => {
    e.preventDefault();
    const msg = {
      id: myId,
      body: message
    };

    if (message.length > 0) {
      socket.emit("send message", msg);
      setMessage("");
    } else {
      setMessage("");
    }
  };

  return (
    <Container size="30">
      <div className="chat-window" style={{ width: "100%" }}>
        {messages.map((item, index) => {
          if (item.id === myId) {
            return <MyPost key={index}>{item.body}</MyPost>;
          } else {
            return <Post key={index}>{item.body}</Post>;
          }
        })}
      </div>
      <div className="chat-footer">
        <div className="chat-footer-input">
          <Input width="30" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="chat-footer-bar">
          <div className="chat-bar-list"></div>
          <Button onClick={(e) => sendMsg(e)}>Send</Button>
        </div>
      </div>
    </Container>
  );
};

export default Chat;
