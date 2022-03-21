import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Avatar, Badge } from "antd";
import Container from "../utils/Container";
import { getProjectTasks, getAllAssignees } from "../../actions/task";
import { getMembers } from "../../actions/member";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const Report = ({ match }) => {
  return (
    <Container size="30">
      <h2>Reports</h2>
      <div class="report__option-list">
        <div class="report__option-item">
          <div>
            <PlusOutlined style={{ fontSize: "50px" }} />
          </div>
          <Link to={`${match.url}/custom`}>
            Custom report <br /> (coming soon)
          </Link>
        </div>
        <div class="report__option-item">
          <Link to={`${match.url}/active`}>Task - Time</Link>
        </div>
        <div class="report__option-item">
          <Link to={`${match.url}/completed`}>Member - Time</Link>
        </div>
      </div>
    </Container>
  );
};

export default Report;
