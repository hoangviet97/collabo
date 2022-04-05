import React, { useEffect, useState } from "react";
import Container from "../utils/Container";
import { Calendar, Badge } from "antd";
import { colorList } from "../utils/Colors";
import moment from "moment";
import { connect } from "react-redux";
import { getProjectTasks } from "../../actions/task";

//const localizer = momentLocalizer(moment);

class CalendarTask {
  constructor(id, title, start, end) {
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
  }
}

const ProjectCalendar = (props) => {
  const events = [
    {
      id: 1,
      color: "#fd3153",
      from: "2019-05-02T18:00:00+00:00",
      to: "2019-05-05T19:00:00+00:00",
      title: "This is an event"
    },
    {
      id: 2,
      color: "#1ccb9e",
      from: "2019-05-01T13:00:00+00:00",
      to: "2019-05-05T14:00:00+00:00",
      title: "This is another event"
    },
    {
      id: 3,
      color: "#3694DF",
      from: "2019-05-05T13:00:00+00:00",
      to: "2019-05-05T20:00:00+00:00",
      title: "This is also another event"
    }
  ];

  useEffect(() => {
    props.getProjectTasks({ project: props.match.params.id });
  }, []);

  return (
    <div className="calendar">
      <Container size="30"></Container>
    </div>
  );
};

export default ProjectCalendar;
