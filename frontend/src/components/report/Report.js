import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Avatar, Badge } from "antd";
import Container from "../utils/Container";
import { getProjectTasks, getAllAssignees } from "../../actions/task";
import { getMembers } from "../../actions/member";
import AvatarIcon from "../utils/AvatarIcon";

const Report = (props) => {
  useEffect(() => {
    dispatch(getMembers({ id: props.match.params.id }));
    dispatch(getProjectTasks({ id: props.match.params.id }));
    dispatch(getAllAssignees({ id: props.match.params.id }));
  }, []);

  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.members);
  const tasks = useSelector((state) => state.task.tasks);
  const assignees = useSelector((state) => state.task.assignees);
  const [names, setNames] = useState([]);
  const [activeColumns, setActiveColumns] = useState();
  const [activeDataSet, setActiveDataSet] = useState();
  const [activeTaskStatus, setActiveTaskStatus] = useState();

  useEffect(() => {
    const base = [];
    members.map((item) => base.push({ id: item.user_id, firstname: item.firstname, lastname: item.lastname, tasks: [] }));

    if (tasks) {
      for (let { user_id, tasks_id } of assignees) {
        const task = tasks.find((i) => i.id === tasks_id);
        base.find((x) => x.id === user_id)["tasks"].push(task);
      }
    }

    setNames(base);

    console.log(names);
  }, [members, assignees, tasks]);

  const completedColumns = [
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
    },
    {
      title: "Completed tasks",
      dataIndex: "",
      key: "completed",
      render: (text, record) => {
        const completed = record.tasks.filter((i) => i.statusId === "3").length;
        return (
          <span>
            <Badge className="site-badge-count-109" count={completed} style={{ backgroundColor: "#52c41a" }} />
          </span>
        );
      }
    },
    {
      title: "Total",
      dataIndex: "",
      key: "total",
      render: (text, record) => {
        return <span>{record.tasks.length}</span>;
      }
    }
  ];

  const workingOnColumns = [
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
    },
    {
      title: "Working on tasks",
      dataIndex: "",
      key: "working",
      render: (text, record) => {
        const completed = record.tasks.filter((i) => i.statusId === "1").length;
        return (
          <span>
            <Badge className="site-badge-count-109" count={completed} style={{ backgroundColor: "#52c41a" }} />
          </span>
        );
      }
    },
    {
      title: "Total",
      dataIndex: "",
      key: "total",
      render: (text, record) => {
        return <span>{record.tasks.length}</span>;
      }
    }
  ];

  useEffect(() => {
    setActiveColumns(completedColumns);
    setActiveDataSet(names);
    setActiveTaskStatus("3");
  }, []);

  const completeHandle = () => {
    setActiveColumns(completedColumns);
    setActiveDataSet(names);
    setActiveTaskStatus("3");
  };

  const workingOnHandle = () => {
    setActiveColumns(workingOnColumns);
    setActiveDataSet(names);
    setActiveTaskStatus("1");
  };

  const timeEstimateHandle = () => {};

  const timeTrackedHandle = (record) => {
    return record.tasks.filter((i) => i.statusId === activeTaskStatus).map((item, index) => <div key={index}>{item.title}</div>);
  };

  return (
    <Container size="30">
      <div>
        <div class="report__options" style={{ display: "flex", gap: "10px" }}>
          <Button onClick={completeHandle}>Completed</Button>
          <Button onClick={workingOnHandle}>Working On</Button>
          <Button onClick={timeEstimateHandle}>Time Estimated</Button>
          <Button onClick={timeTrackedHandle}>Time Tracked</Button>
        </div>
        <Table
          columns={activeColumns}
          dataSource={names}
          pagination={false}
          rowKey={(record) => record.id}
          expandable={{
            expandedRowRender: (record) => timeTrackedHandle(record),
            rowExpandable: (record) => record.tasks.length > 0
          }}
        />
      </div>
    </Container>
  );
};

export default Report;
