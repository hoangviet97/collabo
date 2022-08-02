import React, { useState, useEffect, FC } from "react";
import Container from "../utils/Container";
import ControlPanel from "./ControlPanel";
import SessionContent from "./SessionContent";
import SessionModal from "../modal/SessionModal";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSessions, filterActiveSessions } from "../../actions/session";

interface Props {
  match: any;
}

const Session: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [isModal, setModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSessions({ project_id: params.id }));
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
    <Container size="50">
      <div className="session">
        <ControlPanel addNewSession={addNewSession} match={match} />
        <SessionContent match={match} />
      </div>
      <SessionModal project_id={params.id} visible={isModal} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

export default Session;
