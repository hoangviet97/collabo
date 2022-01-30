import React, { useState, FC } from "react";
import { Input, Button } from "antd";
import { connect, useDispatch } from "react-redux";
import { createInvitation } from "../../actions/invitation";

const InvitationPanel = ({ project }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(createInvitation({ receiver_email: email, project: project }));
  };

  return (
    <div>
      <Input style={{ width: "30%" }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={submitHandle}>Invite now</Button>
    </div>
  );
};

export default InvitationPanel;
