import React, { useState, useEffect } from "react";
import Container from "../../../utils/Container";
import ControlPanel from "./ControlPanel";
import SessionContent from "./SessionContent";
import SessionModal from "../../../modal/SessionModal";
import { connect } from "react-redux";
import { getSessions } from "../../../../actions/session";

interface Session {
  id: string;
  project_id: string;
  name: string;
  date: Date;
  start: Date;
  end: Date;
  description?: string;
  created_at: Date;
}

interface Props {
  sessions: Array<Session>;
  match: any;
  getSessions: any;
}

const Session: React.FC<Props> = ({ sessions, match, getSessions }) => {
  const [isModal, setModal] = useState<boolean>(false);

  useEffect(() => {
    getSessions({ project_id: match.params.id });
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
      <div className="session">
        <ControlPanel sessions={sessions} match={match} addNewSession={addNewSession} />
        <SessionContent match={match} />{" "}
      </div>
      <SessionModal project_id={match.params.id} visible={isModal} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  sessions: state.session.sessions
});

export default connect(mapStateToProps, { getSessions })(Session);
