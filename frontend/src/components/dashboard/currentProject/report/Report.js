import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Avatar } from "antd";
import Container from "../../../utils/Container";
import { getProjectTasks, getAllAssignees } from "../../../../actions/task";
import { getMembers } from "../../../../actions/member";
import AvatarIcon from "../../../utils/AvatarIcon";

const Report = (props) => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.members);
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(getMembers({ id: props.match.params.id }));
    dispatch(getProjectTasks({ id: props.match.params.id }));
  }, []);

  useEffect(() => {
    const names = [];
    members.map((item) => names.push({ name: `${item.firstname} ${item.lastname}`, tasks: 0 }));
    console.log(names);
  }, [members]);

  const columns = [
    {
      title: "Name",
      dataIndex: "firstname",
      key: "name",
      render: (text, record) => (
        <div>
          <Avatar size="large">
            <AvatarIcon name={record.firstname} />
          </Avatar>
          <span>
            {record.firstname} {record.lastname}
          </span>
        </div>
      )
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
        <Table columns={columns} dataSource={members} pagination={false} />
      </div>
    </Container>
  );
};

export default Report;
