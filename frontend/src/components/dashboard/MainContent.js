import React from "react";
import { Route, Switch } from "react-router-dom";
import Projects from "./Projects";
import Tasks from "./Tasks";
import UserSettings from "./UserSettings";
import ProjectTasks from "./ProjectTasks";

const MainContent = () => {
  return (
    <div className="mainContent">
      <Switch>
        <Route path="/projects" component={Projects} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/settings" component={UserSettings} />
        <Route exact path="/:id/tasks" component={ProjectTasks} />
        <Route path="/:id" component={ProjectTasks} />
      </Switch>
    </div>
  );
};

export default MainContent;
