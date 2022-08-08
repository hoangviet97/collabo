import React, { useState, FC, useContext } from "react";
import { Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { createInvitation } from "../../actions/invitation";
import SocketContext from "../../context/SocketContext";
import { useParams } from "react-router-dom";

const InvitationPanel = () => {
  const socket = useContext(SocketContext);

  const dispatch = useDispatch();
  const params: any = useParams();
  const [email, setEmail] = useState<string>("");

  const submitHandle = (e: any) => {
    e.preventDefault();
    // dispatch with passed socket
    dispatch(createInvitation({ receiver_email: email, project_id: params.id, socket: socket }));
    setEmail("");
  };

  return (
    <div className="team__invite">
      <h2 className="team__invite-header">Invite New People 👋</h2>
      <div className="team__invite-content">
        <Input style={{ flex: "60%", marginRight: "5px", border: "transparent" }} placeholder="Enter e-mail address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button type="primary" style={{ borderRadius: "7px" }} onClick={submitHandle}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default InvitationPanel;
