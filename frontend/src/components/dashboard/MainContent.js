import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Projects from "./projects/Projects";
import Tasks from "./tasks/Tasks";
import UserSettings from "./globalSettings/UserSettings";
import ProjectTasks from "./currentProject/ProjectTasks";
import Chat from "./currentProject/Chat";
import Overview from "./currentProject/Overview";
import Board from "./currentProject/Board";
import Calendar from "./currentProject/Calendar";
import Tags from "./currentProject/Tags";
import Documents from "./currentProject/Documents";
import ProjectMembers from "./currentProject/ProjectMembers";
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
        <Route exact path="/:id/tags" component={Tags} />
        <Route exact path="/:id/documents" component={Documents} />
        <Route exact path="/:id/members" component={ProjectMembers} />
        <Route exact path="/:id" component={ProjectTasks} />
      </Switch>
    </div>
  );
};

export default connect(null, { getProject })(withRouter(MainContent));
