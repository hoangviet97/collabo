import React, { useState } from "react";
import Container from "../../../utils/Container";
import ControlPanel from "./ControlPanel";
import MeetingContent from "./MeetingContent";
import MeetingModal from "../../../modal/MeetingModal";

const Meeting = () => {
  const data = [
    { id: 1, name: "Meeting 1" },
    { id: 1, name: "Meeting 2" },
    { id: 1, name: "Meeting 3" },
    { id: 1, name: "Meeting 4" }
  ];

  const [isModal, setModal] = useState(false);

  const addNewMeeting = () => {
    setModal(true);
  };

  const handleCancel = () => {
    setModal(false);
  };

  const handleOk = () => {
    setModal(false);
  };

  return (
    <Container size="30">
      <div style={{ height: "calc(100vh-60px)", display: "flex", gap: "15px" }}>
        <ControlPanel addNewMeeting={addNewMeeting} />
        <MeetingContent />
        <MeetingModal visible={isModal} handleCancel={handleCancel} handleOk={handleOk} />
      </div>
    </Container>
  );
};

export default Meeting;
