import React, { useState, useEffect } from "react";
import Container from "../utils/Container";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Input } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import MessageEditor from "../modal/MessageEditor";
import { getMessages, getAllReplies } from "../../actions/message";
import Comment from "../comments/Comment";

const Messages = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user.firstname);
  const messages = useSelector((state) => state.message.messages);
  const replies = useSelector((state) => state.message.replies);
  const loading = useSelector((state) => state.message.loading);
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  useEffect(() => {
    dispatch(getMessages({ id: match.params.id }));
    dispatch(getAllReplies({ project: match.params.id }));
  }, []);

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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
        <div className="messages__editor" style={{ display: "flex", width: "50%" }}>
          <Avatar size={50}>
            <AvatarIcon name={profile} />
          </Avatar>
          <Input onClick={openModal} style={{ borderRadius: "20px", padding: "0 15px", marginLeft: "10px" }} />
        </div>
        <div style={{ marginTop: "80px", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {loading
            ? "loading..."
            : messages.map((item, index) => {
                let repliesArr = replies.filter((x) => x.messages_id === item.id);
                return <Comment key={index} data={item} match={match} replies={repliesArr} project={match.params.id} />;
              })}
        </div>
      </div>
      <MessageEditor project={match.params.id} visible={isEditorVisible} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

export default Messages;
