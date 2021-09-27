import React from "react";
import { Table } from "antd";

interface Record {
  id: string;
  start: Date;
  end: Date;
  created_at: Date;
  tasks_id: string;
  users_id: string;
  total: number;
  description?: string;
  task_title: string;
  section_name: string;
}

interface Props {
  records: Array<Record>;
}

const TimerLogger: React.FC<Props> = ({ records }) => {
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
