import React, { useEffect, useState } from "react";
import Container from "../../../utils/Container";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { connect } from "react-redux";

const localizer = momentLocalizer(moment);

const ProjectCalendar = () => {
  const header = <h1 onClick={() => console.log("hello")}>Setup project management</h1>;

  const myEventsList = [
    {
      id: 0,
      title: header,
      allDay: false,
      start: new Date(2021, 2, 1),
      end: new Date(2021, 2, 6)
    },
    {
      id: 1,
      title: "Undefined distance",
      start: new Date(2021, 1, 1),
      end: new Date(2021, 1, 6)
    },

    {
      id: 2,
      title: "Taken rootform xpec",
      start: new Date(2021, 1, 1),
      end: new Date(2021, 1, 6)
    }
  ];
  return (
    <div className="calendar">
      <Container size="30">
        <Calendar localizer={localizer} events={myEventsList} startAccessor="start" endAccessor="end" style={{ height: "calc(100vh - 120px)" }} />
      </Container>
    </div>
  );
};

export default connect()(ProjectCalendar);
