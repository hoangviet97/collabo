import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { colorList } from "../utils/Colors";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ProjectCalendar = (props) => {
  const events = [
    {
      id: 1,
      color: "#fd3153",
      from: "2022-05-02T18:00:00+00:00",
      to: "2022-05-05T19:00:00+00:00",
      title: "This is an event"
    },
    {
      id: 2,
      color: "#1ccb9e",
      from: "2022-05-01T13:00:00+00:00",
      to: "2022-05-05T14:00:00+00:00",
      title: "This is another event"
    },
    {
      id: 3,
      color: "#3694DF",
      from: "2022-05-05T13:00:00+00:00",
      to: "2022-05-05T20:00:00+00:00",
      title: "This is also another event"
    }
  ];

  return (
    <div className="calendar">
      <Container size="30">
        <Calendar style={{ height: "calc(100vh - 120px)" }} localizer={localizer} events={events} startAccessor="from" endAccessor="to" />
      </Container>
    </div>
  );
};

export default ProjectCalendar;
