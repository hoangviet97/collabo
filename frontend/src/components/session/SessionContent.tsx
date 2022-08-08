import React, { FC } from "react";
import { Route, Switch, useLocation, match } from "react-router-dom";
import SessionItem from "./SessionItem";
import SessionWelcome from "./SessionWelcome";

interface Props {
  match: any;
}

const SessionContent: FC<Props> = ({ match }) => {
  return (
    <div className="session__content">
      <Switch>
        <Route exact path={`${match.url}`} component={SessionWelcome} />
        <Route exact path={`${match.url}/:sessionId`} component={SessionItem} />
      </Switch>
    </div>
  );
};

export default SessionContent;
