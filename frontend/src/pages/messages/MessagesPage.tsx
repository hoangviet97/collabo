import React, { useState, useEffect } from "react";
import Container from "../../components/utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Input } from "antd";
import MessageEditor from "../../components/modal/MessageEditor";
import { getMessages } from "../../redux/actions/message";
import Message from "../../components/message/Message";
import { message } from "../../types/types";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const MessagesPage: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootStateOrAny) => state.auth.user.firstname);
  const messages = useSelector((state: RootStateOrAny) => state.message.messages);
  const loading = useSelector((state: RootStateOrAny) => state.message.loading);
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMessages(params.id));
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
      <div className="messages">
        <div className="messages__editor">
          <Input className="messages__input" onClick={openModal} placeholder="Add new message..." />
        </div>
        <div className="messages__container">
          {loading
            ? "loading..."
            : messages.map((item: message, index: number) => {
                return <Message key={index} data={item} />;
              })}
        </div>
      </div>
      <MessageEditor visible={isEditorVisible} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

export default MessagesPage;
