import React, { useState } from "react";
import { Input, Button } from "antd";
import { connect } from "react-redux";
import { createInvitation } from "../../../../actions/invitation";

const InvitationPanel = (props) => {
  const [email, setEmail] = useState("");

  const submitHandle = (e) => {
    window.alert("hello");
    e.preventDefault();
    props.createInvitation({ receiver_email: email, project: props.project });
  };

  return (
    <div>
      <Input style={{ width: "30%" }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={submitHandle}>Invite now</Button>
    </div>
  );
};

export default connect(null, { createInvitation })(InvitationPanel);
