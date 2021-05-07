import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Projects from "./projects/Projects";
import Tasks from "./tasks/Tasks";
import UserSettings from "./globalSettings/UserSettings";
import ProjectTasks from "./currentProject/tasks/ProjectTasks";
import Chat from "./currentProject/chat/Chat";
import Overview from "./currentProject/overview/Overview";
import Board from "./currentProject/board/Board";
import Calendar from "./currentProject/calendar/Calendar";
import Documents from "./currentProject/documents/Documents";
import Team from "./currentProject/team/Team";
import { getProject } from "../../actions/project";
import { connect } from "react-redux";

const MainContent = (props) => {
  let path = window.location.pathname;
  let pathValue = path.split("/")[1];

  useEffect(() => {
    if (pathValue.length === 8 && isNaN(pathValue) === false) {
      props.getProject(pathValue);
    }
  }, [props.match]);

  return (
    <div className="mainContent">
      <Switch>
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/tasks" component={Tasks} />
        <Route exact path="/settings" component={UserSettings} />
        <Route exact path="/:id/tasks" component={ProjectTasks} />
        <Route exact path="/:id/chat" component={Chat} />
        <Route exact path="/:id/overview" component={Overview} />
        <Route exact path="/:id/calendar" component={Calendar} />
        <Route exact path="/:id/board" component={Board} />
        <Route exact path="/:id/documents" component={Documents} />
        <Route exact path="/:id/team" component={Team} />
        <Route exact path="/:id" component={ProjectTasks} />
      </Switch>
    </div>
  );
};

export default connect(null, { getProject })(withRouter(MainContent));
