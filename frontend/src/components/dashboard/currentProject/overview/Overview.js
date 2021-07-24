import React, { useEffect } from "react";
import Container from "../../../utils/Container";
import socket from "../../../../service/socket";

const Overview = () => {
  useEffect(() => {
    socket.emit("meet", "meeting");
  }, []);

  return (
    <div className="overview">
      <Container size="30">
        <h2>Overview</h2>
      </Container>
    </div>
  );
};

export default Overview;
