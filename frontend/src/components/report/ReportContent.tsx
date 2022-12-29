import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "../../pages/404/NotFound";
import ReportDefault from "./ReportDefault";
import Report from "./Report";

interface Props {
  match: any;
}

const ReportContent: FC<Props> = ({ match }) => {
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

export default ReportContent;
