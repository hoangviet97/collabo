import React, { useRouteMatch } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import SessionItem from "./SessionItem";
import { connect } from "react-redux";
import { getSessions } from "../../../../actions/session";

const SessionContent = (props) => {
  return (
    <div className="meeting__content" style={{ backgroundColor: "white", padding: "15px", height: "calc(100vh - 120px)", flex: 1, borderRadius: "12px" }}>
      <Switch>
        <Route exact path={`${props.match.path}/:sessionId`} component={SessionItem} />
      </Switch>
    </div>
  );
};

export default SessionContent;
