import React from "react";
import { Route, Switch, RouteComponentProps, withRouter } from "react-router-dom";
import SessionItem from "./SessionItem";
import SessionWelcome from "./SessionWelcome";

const SessionContent = ({ match }: RouteComponentProps) => {
  return (
    <div className="session__content">
      <Switch>
        <Route exact path={`${match.url}`} component={SessionWelcome} />
        <Route exact path={`${match.url}/:sessionId`} component={SessionItem} />
      </Switch>
    </div>
  );
};

export default withRouter(SessionContent);
