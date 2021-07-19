import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Container from "../../../utils/Container";
import MyPost from "./posts/MyPost";
import Post from "./posts/Post";
import { Input, Button } from "antd";
import { createPost } from "../../../../actions/post";
import io from "socket.io-client";
import "./Chat.scss";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let socket = null;
  socket = io("http://localhost:9000/chat", { transports: ["websocket", "polling", "flashsocket"] });

  useEffect(() => {
    socket.on("get post", (data) => {
      receivedMsg(data);
    });
  }, [0]);

  const receivedMsg = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  const sendMsg = (e) => {
    e.preventDefault();
    const postBody = {
      id: props.user.id,
      name: props.user.firstname,
      project: props.match.params.id,
      body: message
    };

    if (message.length > 0) {
      props.createPost({ socket, postBody });
      setMessage("");
    } else {
      setMessage("");
    }
  };

  return (
    <Container size="30">
      <div className="chat-window" style={{ width: "100%" }}>
        {messages.map((item, index) => {
          if (item.users_id === props.user.id) {
            return <MyPost key={index} post={item} />;
          } else {
            return <Post key={index} post={item} />;
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

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { createPost })(Chat);
