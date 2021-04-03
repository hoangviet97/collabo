import React from "react";
import { Route, Switch } from "react-router-dom";
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
        <Route path="/projects" component={Projects} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/settings" component={UserSettings} />
        <Route exact path="/:id/tasks" component={ProjectTasks} />
        <Route exact path="/:id/chat" component={Chat} />
        <Route exact path="/:id/overview" component={Overview} />
        <Route exact path="/:id/calendar" component={Calendar} />
        <Route exact path="/:id/board" component={Board} />
        <Route path="/:id" component={ProjectTasks} />
      </Switch>
    </div>
  );
};

export default MainContent;
