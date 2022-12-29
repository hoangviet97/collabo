import React, { useState, useEffect, FC } from "react";
import Container from "../../components/utils/Container";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Input } from "antd";
import MessageEditor from "../../components/modal/MessageEditor";
import { getMessages } from "../../redux/actions/message";
import Message from "../../components/message/Message";
import { message } from "../../types/types";

interface Props {
  match: any;
}

const MessagesPage: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootStateOrAny) => state.auth.user.firstname);
  const messages = useSelector((state: RootStateOrAny) => state.message.messages);
  const loading = useSelector((state: RootStateOrAny) => state.message.loading);
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMessages(match.params.id));
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
                return <Message key={index} data={item} match={match} project={match.params.id} />;
              })}
        </div>
      </div>
      <MessageEditor project={match.params.id} visible={isEditorVisible} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

export default MessagesPage;
