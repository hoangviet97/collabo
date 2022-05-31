import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Avatar, Badge } from "antd";
import Container from "../utils/Container";
import { getProjectTasks, getAllAssignees } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { Switch, Route } from "react-router-dom";

interface Props {
  match: any;
}

const Report: FC<Props> = ({ match }) => {
  return (
    <Container size="30">
      <div></div>
    </Container>
  );
};

export default Report;
