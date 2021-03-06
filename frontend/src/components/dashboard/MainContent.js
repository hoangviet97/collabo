import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import TimeTracker from "./currentProject/timeTracker/TimeTracker";
import Projects from "./projects/Projects";
import Tasks from "./tasks/Tasks";
import UserSettings from "./globalSettings/UserSettings";
import ProjectTasks from "./currentProject/tasks/ProjectTasks";
import Chat from "./currentProject/chat/Chat";
import Overview from "./currentProject/overview/Overview";
import Board from "./currentProject/board/Board";
import ProjectCalendar from "./currentProject/calendar/ProjectCalendar";
import Documents from "./currentProject/documents/Documents";
import Team from "./currentProject/team/Team";
import Notifications from "./notifications/Notifications";
import NotFound from "../layout/NotFound";
import Session from "./currentProject/session/Session";
import { getProject } from "../../actions/project";
import { getAllInvitations } from "../../actions/invitation";
import { connect } from "react-redux";
//import io from "socket.io-client";
import socket from "../../service/socket";
import { message } from "antd";

const MainContent = (props) => {
  let path = window.location.pathname;
  let pathValue = path.split("/")[1];

  useEffect(() => {
    if (pathValue.length === 8 && isNaN(pathValue) === false) {
      props.getProject(pathValue);
    }
  }, [props.match]);

  useEffect(() => {
    props.getAllInvitations();
  }, []);

  return (
    <div className="mainContent">
      <Switch>
        <Route exact path="/" component={Projects} />
        <Route exact path="/notifications" component={Notifications} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/settings" component={UserSettings} />
        <Route exact path="/:id/tasks" component={ProjectTasks} />
        <Route exact path="/:id/chat" component={Chat} />
        <Route exact path="/:id/overview" component={Overview} />
        <Route exact path="/:id/calendar" component={ProjectCalendar} />
        <Route exact path="/:id/board" component={Board} />
        <Route exact path="/:id/documents" component={Documents} />
        <Route exact path="/:id/tracker" component={TimeTracker} />
        <Route exact path="/:id/team" component={Team} />
        <Route path="/:id/sessions" component={Session} />
        <Route exact path="/:id" component={ProjectTasks} />
      </Switch>
    </div>
  );
};

export default connect(null, { getProject, getAllInvitations })(withRouter(MainContent));
