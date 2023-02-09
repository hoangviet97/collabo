import React, { useState, useContext, ChangeEvent } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { createInvitation } from "../../redux/actions/invitation";
import SocketContext from "../../context/SocketContext";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const InvitationPanel: React.FunctionComponent = () => {
  const socket = useContext(SocketContext);

  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<{ id: string }>();
  const [email, setEmail] = useState<string>("");

  const submitHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(createInvitation(email, params.id, socket));
    setEmail("");
  };

  return (
    <div className="team__invite">
      <h2 className="team__invite-header">Invite New People 👋</h2>
      <div className="team__invite-content">
        <Input type="email" name="email" aria-label="email" className="team__invite-input" placeholder="Enter e-mail address" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        <Button type="primary" aria-label="submit" style={{ borderRadius: "7px" }} onClick={submitHandle}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default InvitationPanel;
