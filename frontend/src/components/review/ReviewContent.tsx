import React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewDefault from "./ReviewDefault";
import NotFound from "../../pages/404/NotFound";

const ReviewContent = ({ match }: RouteComponentProps) => {
  return (
    <div className="review__content">
      <Switch>
        <Route exact path={`${match.path}/`} component={ReviewDefault} />
        <Route exact path={`${match.path}/:memberId`} component={ReviewList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default withRouter(ReviewContent);
