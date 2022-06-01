import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import SessionItem from "./SessionItem";
import SessionWelcome from "./SessionWelcome";

interface Props {
  match: any;
}

const SessionContent: FC<Props> = ({ match }) => {
  return (
    <div className="session__content">
      <Switch>
        <Route exact path={`${match.path}/`} component={SessionWelcome} />
        <Route exact path={`${match.path}/:sessionId`} component={SessionItem} />
      </Switch>
    </div>
  );
};

export default SessionContent;