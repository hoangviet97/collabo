import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import moment from "moment";

const FileList = (props) => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created",
      render: (text, record) => moment(record.created_at).startOf("hour").fromNow()
    },
    {
      title: "Download",
      key: "download",
      width: "12%",
      render: (text, record) => (
        <Space size="middle">
          <a>download</a>
        </Space>
      )
    }
  ];

  return (
    <div className="files-container">
      <Table columns={columns} dataSource={props.files} />
    </div>
  );
};

export default FileList;
