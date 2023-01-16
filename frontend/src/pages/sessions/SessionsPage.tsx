import React, { useState, useEffect } from "react";
import Container from "../../components/utils/Container";
import ControlPanel from "../../components/session/controlPanel/ControlPanel";
import SessionContent from "../../components/session/SessionContent";
import SessionModal from "../../components/modal/SessionModal";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSessions } from "../../redux/actions/session";
import { AppDispatch } from "../../redux/store";

const SessionsPage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params: any = useParams();
  const [isModal, setModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getSessions(params.id));
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
        <ControlPanel addNewSession={addNewSession} />
        <SessionContent />
      </div>
      <SessionModal project_id={params.id} visible={isModal} handleCancel={handleCancel} handleOk={handleOk} />
    </Container>
  );
};

export default SessionsPage;
