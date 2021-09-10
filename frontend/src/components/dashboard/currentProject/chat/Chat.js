import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Container from "../../../utils/Container";
import MyPost from "./posts/MyPost";
import Post from "./posts/Post";
import { Input, Button } from "antd";
import { createPost, getAllPosts } from "../../../../actions/post";
import { PaperClipOutlined, BarsOutlined, PictureOutlined, SmileOutlined, SendOutlined } from "@ant-design/icons";
import "./Chat.scss";
import socket from "../../../../service/socket";
import TaskAttachmentModal from "../../../modal/TaskAttachmentModal";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTaskAttachmentOpen, setisTaskAttachmentOpen] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    props.getAllPosts({ id: props.match.params.id });
    socket.on("get post", (data) => {
      receivedMsg(data);
    });
  }, []);

  useEffect(() => {
    setMessages(props.posts);
  }, [props.posts]);

  const receivedMsg = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    document.querySelector(".chat__window").scrollTop = document.querySelector(".chat__window").scrollHeight;
  }, [messages]);

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

  const addEmoji = (e) => {
    console.log(e.native);
    setMessage((prev) => prev + e.native);
  };

  return (
    <Container size="30">
      <div className="chat__window">
        {messages.length > 0 &&
          messages.map((item, index) => {
            if (item.users_id === props.user.id) {
              return <MyPost key={index} post={item} />;
            } else {
              return <Post key={index} post={item} />;
            }
          })}
      </div>
      <div className="chat__footer">
        <div className="chat__footer-input">
          <Input className="input" size="large" value={message} allowClear onChange={(e) => setMessage(e.target.value)} />
          <div class="chat__footer-attachment"></div>
        </div>
        <div className="chat__footer-bar">
          <div className="chat-bar-list" style={{ display: "flex", gap: "18px" }}>
            <div className="chat__bar-item">
              <PaperClipOutlined style={{ fontSize: "19px" }} />
            </div>
            <div className="chat__bar-item" onClick={() => setisTaskAttachmentOpen(true)}>
              <BarsOutlined style={{ fontSize: "19px" }} />
              {isTaskAttachmentOpen && <TaskAttachmentModal />}
            </div>
            <div className="chat__bar-item">
              <PictureOutlined style={{ fontSize: "19px" }} />
            </div>
            <div className="chat__bar-item">
              <SmileOutlined style={{ fontSize: "19px" }} onClick={() => setShowEmoji(true)} />
              {showEmoji && (
                <div style={{ position: "absolute", zIndex: 99999, width: "100%", height: "100%", top: 0, left: 0, right: 0, bottom: 0 }} onClick={() => setShowEmoji((prev) => !prev)}>
                  <div style={{ position: "absolute", top: "50%" }}>
                    <Picker onSelect={addEmoji} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button type="primary" onClick={(e) => sendMsg(e)}>
            <SendOutlined />
          </Button>
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  posts: state.post.posts
});

export default connect(mapStateToProps, { createPost, getAllPosts })(Chat);
