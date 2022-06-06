import React, { useEffect, FC } from "react";
import Container from "../utils/Container";
import { getProjectTasks } from "../../actions/task";
import moment from "moment";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

interface Props {
  match: any;
}

const ProjectCalendar: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);

  useEffect(() => {
    dispatch(getProjectTasks({ project_id: match.params.id }));
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
