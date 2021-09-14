import React, { useState, useEffect, FC } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Container from "../../../utils/Container";
import MyPost from "./posts/MyPost";
import Post from "./posts/Post";
import { Button } from "antd";
import { createPost, getAllPosts } from "../../../../actions/post";
import { getMembers } from "../../../../actions/member";
import { PaperClipOutlined, BarsOutlined, PictureOutlined, SmileOutlined, SendOutlined } from "@ant-design/icons";
import socket from "../../../../service/socket";
import TaskAttachmentModal from "../../../modal/TaskAttachmentModal";
import { Mention, MentionsInput } from "react-mentions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

interface Props {
  match: any;
}

const Chat: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateOrAny) => state.auth.user);
  const posts = useSelector((state: RootStateOrAny) => state.post.posts);
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const [messages, setMessages] = useState<Array<any>>([]);
  const [message, setMessage] = useState<string>("");
  const [isTaskAttachmentOpen, setisTaskAttachmentOpen] = useState<boolean>(false);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<Array<any>>([]);

  useEffect(() => {
    dispatch(getAllPosts({ id: match.params.id }));
    dispatch(getMembers({ id: match.params.id }));
    socket.on("get post", (data) => {
      receivedMsg(data);
    });
  }, []);

  useEffect(() => {
    setMessages(posts);
  }, [posts]);

  useEffect(() => {
    const newList = [];
    members.map((i) => newList.push({ id: i.id, display: `${i.firstname} ${i.lastname}` }));
    setMemberList(newList);
  }, [members]);

  const receivedMsg = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    document.querySelector(".chat__window").scrollTop = document.querySelector(".chat__window").scrollHeight;
  }, [messages]);

  const sendMsg = (e: any) => {
    e.preventDefault();
    const postBody = {
      id: user.id,
      name: user.firstname,
      project: match.params.id,
      body: message
    };

    if (message.length > 0) {
      dispatch(createPost({ socket, postBody }));
      setMessage("");
    } else {
      setMessage("");
    }
  };

  const addEmoji = (e: any) => {
    setMessage((prev) => prev + e.native);
  };

  const colonsToUnicode = (text: any) => {
    const colonsRegex = new RegExp("(^|\\s):([)|D|(|P|O|o])+", "g");
    let newText = text;

    let match = colonsRegex.exec(text);

    if (match !== null) {
      let offset = match.index + match[1].length;

      newText = newText.slice(0, offset) + newText.slice(offset + 2);
    }
    return newText;
  };

  return (
    <Container size="30">
      <div className="chat__window">
        {messages.length > 0 &&
          messages.map((item, index) => {
            if (item.users_id === user.id) {
              return <MyPost key={index} post={item} />;
            } else {
              return <Post key={index} post={item} />;
            }
          })}
      </div>
      <div className="chat__footer">
        <div className="chat__footer-input">
          <MentionsInput value={message} onChange={(e) => setMessage(colonsToUnicode(e.target.value))} className="mentions" placeholder="Leave a comment..." allowSuggestionsAboveCursor={true}>
            <Mention trigger="@" data={memberList} />
          </MentionsInput>
          <div className="chat__footer-attachment"></div>
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

export default Chat;
