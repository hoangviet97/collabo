import React, { useState } from "react";
import { Input, Button } from "antd";

const Invitation = () => {
  const [email, setEmail] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button onClick={submitHandle}>Invite</Button>
    </div>
  );
};

export default Invitation;
