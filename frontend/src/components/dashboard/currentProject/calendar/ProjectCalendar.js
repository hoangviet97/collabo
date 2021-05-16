import React from "react";
import Container from "../../../utils/Container";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "react-moment";

const ProjectCalendar = () => {
  return (
    <div className="calendar" style={{ height: "100vh" }}>
      <Container size="30">
        <h1>Calendar</h1>
      </Container>
    </div>
  );
};

export default ProjectCalendar;
