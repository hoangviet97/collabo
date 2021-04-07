import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Projects from "./Projects";
import Tasks from "./Tasks";
import UserSettings from "./UserSettings";
import ProjectTasks from "./ProjectTasks";
import Chat from "./Chat";
import Overview from "./Overview";
import Board from "./Board";
import Calendar from "./Calendar";

const MainContent = () => {
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
        <Route exact path="/:id" component={ProjectTasks} />
      </Switch>
    </div>
  );
};

export default MainContent;
