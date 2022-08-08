import React, { useEffect, FC } from "react";
import { Switch, Route } from "react-router-dom";
import ReviewList from "./ReviewList";
import ReviewDefault from "./ReviewDefault";
import NotFound from "../layout/NotFound";

interface Props {
  match: any;
}

const ReviewContent: FC<Props> = ({ match }) => {
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

export default ReviewContent;
