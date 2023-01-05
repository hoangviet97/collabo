import React, { FC } from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import NotFound from "../../pages/404/NotFound";
import ReportDefault from "./ReportDefault";
import Report from "./Report";

const ReportContent = ({ match }: RouteComponentProps) => {
  return (
    <div className="report__content">
      <Switch>
        <Route exact path={`${match.path}/`} component={ReportDefault} />
        <Route exact path={`${match.path}/:memberId`} component={Report} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default withRouter(ReportContent);
