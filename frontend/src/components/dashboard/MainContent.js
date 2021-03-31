import React from "react";
import { Route, Switch } from "react-router-dom";
import Projects from "./Projects";
import Tasks from "./Tasks";
import UserSettings from "./UserSettings";

const MainContent = () => {
  return (
    <div className="mainContent">
      <Switch>
        <Route path="/projects" component={Projects} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/settings" component={UserSettings} />
      </Switch>
    </div>
  );
};

export default MainContent;
