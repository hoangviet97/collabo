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

interface Props {
  match: any;
}

const Report: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const today: any = new Date();
  const sessions = useSelector((state: RootStateOrAny) => state.session.sessions);

  useEffect(() => {
    dispatch(getSessions({ project_id: params.id }));
  }, []);

  return (
    <Container size="30">
      gyg
      <div>
        {sessions
          .filter((item: any) => moment(item.date).format("MMM Do YY") > moment(today).format("MMM Do YY"))
          .map((item: any) => (
            <div>{item.name}</div>
          ))}
      </div>
    </Container>
  );
};

export default Report;
