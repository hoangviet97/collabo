import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

const TimerLogger = () => {
  const records = useSelector((state) => state.time_record.records);

  const columns = [
    {
      title: "Section",
      dataIndex: "section_name",
      key: "section_name"
    },
    {
      title: "Task",
      dataIndex: "task_title",
      key: "task_title"
    },
    {
      title: "Date",
      dataIndex: "start",
      key: "start"
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "start"
    }
  ];

  return (
    <div>
      <Table dataSource={records} columns={columns} />
    </div>
  );
};

export default TimerLogger;
