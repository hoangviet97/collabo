import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Avatar, Badge } from "antd";
import Container from "../utils/Container";
import { getProjectTasks, getAllAssignees } from "../../actions/task";
import { getMembers } from "../../actions/member";
import ReportHome from "./ReportHome";
import CompletedTasksReport from "./CompletedTasksReport";
import ActiveTasksReport from "./ActiveTasksReport";
import { Switch, Route } from "react-router-dom";

const Report = ({ match }) => {
  console.log(match.path);
  return (
    <Container size="30">
      <Switch>
        <Route exact path={`${match.path}/`}>
          <ReportHome project_id={match.params.id} match={match} />
        </Route>
        <Route exact path={`${match.path}/tasks`}>
          <CompletedTasksReport project_id={match.params.id} match={match} />
        </Route>
        <Route exact path={`${match.path}/members`}>
          <ActiveTasksReport project_id={match.params.id} match={match} />
        </Route>
      </Switch>
    </Container>
  );
};

export default Report;
