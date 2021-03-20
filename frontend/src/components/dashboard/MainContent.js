import React from "react";
import { Route, Switch } from "react-router-dom";
import Projects from "./Projects";
import Tasks from "./Tasks";

const MainContent = () => {
  return (
    <div class="mainContent">
      <Switch>
        <Route path="/projects" component={Projects} />
        <Route path="/tasks" component={Tasks} />
      </Switch>
    </div>
  );
};

export default MainContent;
