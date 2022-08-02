import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Table, Button, Avatar, Badge } from "antd";
import Container from "../utils/Container";
import { getProjectTasks, getAllAssignees } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { Switch, Route } from "react-router-dom";
import { getSessions } from "../../actions/session";
import { useParams } from "react-router-dom";
import moment from "moment";
import ReportControlPanel from "./ReportControlPanel";
import ReportContent from "./ReportContent";

interface Props {
  match: any;
}

const ReportPage: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const today: any = new Date();

  return (
    <Container size="50">
      <div className="report">
        <ReportControlPanel match={match} />
        <ReportContent match={match} />
      </div>
    </Container>
  );
};

export default ReportPage;
