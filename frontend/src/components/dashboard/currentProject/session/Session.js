import React, { useState, useEffect } from "react";
import Container from "../../../utils/Container";
import ControlPanel from "./ControlPanel";
import SessionContent from "./SessionContent";
import SessionModal from "../../../modal/SessionModal";
import { connect } from "react-redux";
import { getSessions } from "../../../../actions/session";

const Session = (props) => {
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    props.getSessions({ project_id: props.match.params.id });
  }, []);

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
        <ControlPanel sessions={props.sessions} project_id={props.match.params.id} match={props.match} addNewSession={addNewSession} />
        <SessionContent project_id={props.match.params.id} match={props.match} />{" "}
      </div>
      <SessionModal project_id={props.match.params.id} visible={isModal} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  sessions: state.session.sessions
});

export default connect(mapStateToProps, { getSessions })(Session);
