import React, { useState, useEffect, FC } from "react";
import Container from "../utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Avatar, Input } from "antd";
import AvatarIcon from "../utils/AvatarIcon";
import MessageEditor from "../modal/MessageEditor";
import { getMessages, getAllReplies } from "../../actions/message";
import Comment from "../comments/Comment";

interface Props {
  match: any;
}

const Messages: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootStateOrAny) => state.auth.user.firstname);
  const messages = useSelector((state: RootStateOrAny) => state.message.messages);
  const replies = useSelector((state: RootStateOrAny) => state.message.replies);
  const loading = useSelector((state: RootStateOrAny) => state.message.loading);
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);

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
            : messages.map((item: any, index: number) => {
                let repliesArr = replies.filter((x: any) => x.messages_id === item.id);
                return <Comment key={index} data={item} match={match} replies={repliesArr} project={match.params.id} />;
              })}
        </div>
      </div>
      <MessageEditor project={match.params.id} visible={isEditorVisible} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

export default Messages;
