import React, { useState, useEffect } from "react";
import Container from "../utils/Container";
import ControlPanel from "./ControlPanel";
import SessionContent from "./SessionContent";
import SessionModal from "../modal/SessionModal";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { getSessions } from "../../actions/session";

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
  match: any;
}

const Session: React.FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const sessions = useSelector((state: RootStateOrAny) => state.session.sessions);
  const [isModal, setModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSessions({ project_id: match.params.id }));
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

export default Session;
