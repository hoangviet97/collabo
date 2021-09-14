import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "antd";
import Container from "../../../utils/Container";

const Report = (props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "firstname",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    }
  ];

  const completeHandle = () => {};

  const workingOnHandle = () => {};

  const timeEstimateHandle = () => {};

  const timeTrackedHandle = () => {};

  return (
    <Container size="30">
      <div>
        <div class="report__options" style={{ display: "flex", gap: "10px" }}>
          <Button onClick={completeHandle}>Completed</Button>
          <Button onClick={workingOnHandle}>Working On</Button>
          <Button onClick={timeEstimateHandle}>Time Estimated</Button>
          <Button onClick={timeTrackedHandle}>Time Tracked</Button>
        </div>
        <Table columns={columns} pagination={false} />;
      </div>
    </Container>
  );
};

export default Report;
