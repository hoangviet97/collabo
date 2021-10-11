import React from "react";
import { Table } from "antd";
import moment from "moment";

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
      key: "start",
      render: (record: any) => <span>{moment(record).format("ll")}</span>
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "start",
      render: (record: any) => (
        <span>
          {`${Math.floor(record / 3600)}`.slice(-2)}:{`0${Math.floor(record / 60) % 60}`.slice(-2)}
        </span>
      )
    }
  ];

  return (
    <div>
      <Table dataSource={records} columns={columns} />
    </div>
  );
};

export default TimerLogger;
