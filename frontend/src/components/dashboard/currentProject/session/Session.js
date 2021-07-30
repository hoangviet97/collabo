import React, { useState } from "react";
import Container from "../../../utils/Container";
import ControlPanel from "./ControlPanel";
import SessionContent from "./SessionContent";
import SessionModal from "../../../modal/SessionModal";

const Session = (props) => {
  const data = [
    { id: 1, name: "Meeting 1" },
    { id: 1, name: "Meeting 2" },
    { id: 1, name: "Meeting 3" },
    { id: 1, name: "Meeting 4" }
  ];

  const [isModal, setModal] = useState(false);

  const addNewSession = () => {
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
        <ControlPanel project_id={props.match.params.id} addNewSession={addNewSession} />
        <SessionContent />
        <SessionModal project_id={props.match.params.id} visible={isModal} handleCancel={handleCancel} handleOk={handleOk} />
      </div>
    </Container>
  );
};

export default Session;
