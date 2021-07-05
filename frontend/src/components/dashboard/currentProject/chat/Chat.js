import React, { useState } from "react";
import Container from "../../../utils/Container";
import ControlPanel from "./ControlPanel";
import ChatContent from "./ChatContent";
import NewChannelModal from "../../../modal/NewChannelModal";

const Chat = (props) => {
  const [isModal, setModal] = useState(false);

  let path = window.location.pathname;
  let pathValue = path.split("/")[1];

  const addNewChannel = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <Container size="30">
      <div style={{ height: "calc(100vh-60px)", display: "flex", gap: "15px" }}>
        <ControlPanel projectId={pathValue} addNewChannel={addNewChannel} />
        <ChatContent />
        <NewChannelModal projectId={pathValue} visible={isModal} handleCancel={handleCancel} />
      </div>
    </Container>
  );
};

export default Chat;
