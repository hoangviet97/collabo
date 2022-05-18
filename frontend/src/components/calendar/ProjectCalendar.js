import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { colorList } from "../utils/Colors";
import { getCalendarTasks, getProjectTasks } from "../../actions/task";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ProjectCalendar = ({ match }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getProjectTasks({ project: match.params.id }));
  }, []);

  return (
    <div className="calendar">
      <Container size="30">
        <Calendar style={{ height: "calc(100vh - 120px)" }} localizer={localizer} events={tasks} startAccessor="start_date" endAccessor="due_date" />
      </Container>
    </div>
  );
};

export default ProjectCalendar;
