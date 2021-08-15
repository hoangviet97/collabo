import React from "react";
import TimerBody from "./TimerBody";
import TimerHeader from "./TimerHeader";
import Container from "../../../utils/Container";

const TimeTracker = (props) => {
  return (
    <div>
      <Container size="30">
        <TimerHeader />
        <TimerBody />
      </Container>
    </div>
  );
};

export default TimeTracker;
