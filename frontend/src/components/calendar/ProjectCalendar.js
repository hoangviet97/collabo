import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { colorList } from "../utils/Colors";
import { getCalendarTasks } from "../../actions/task";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ProjectCalendar = ({ match }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getCalendarTasks({ project: match.params.id }));
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const events = [
    {
      id: 1,
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
        <Calendar style={{ height: "calc(100vh - 120px)" }} localizer={localizer} events={tasks} startAccessor="from" endAccessor="to" />
      </Container>
    </div>
  );
};

export default ProjectCalendar;
