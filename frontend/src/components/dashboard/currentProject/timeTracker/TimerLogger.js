import React from "react";
import { Table } from "antd";
import { connect } from "react-redux";

const TimerLogger = (props) => {
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
      title: "Date",
      dataIndex: "start",
      key: "start"
    }
  ];

  return (
    <div>
      <Table dataSource={props.records} columns={columns} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  records: state.time_record.records
});

export default connect(mapStateToProps, {})(TimerLogger);
