import React, { useEffect, useState } from "react";
import { Table, Space, Dropdown, Menu, Typography } from "antd";
import moment from "moment";
import download from "downloadjs";
import axios from "axios";
import { EllipsisOutlined } from "@ant-design/icons";

const FileList = (props) => {
  const { Text, Link } = Typography;

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.post(`http://localhost:9000/api/files/download/${id}`, {
        responseType: "blob"
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error while downloading file. Try again later");
      }
    }
  };

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
      title: "",
      key: "download",
      width: "12%",
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={() => menu(record)} trigger={["click"]}>
            <a>
              <EllipsisOutlined style={{ fontSize: "20px" }} />
            </a>
          </Dropdown>
        </Space>
      )
    }
  ];

  const menu = (record) => (
    <Menu>
      <Menu.Item key="0">
        <a onClick={() => downloadFile(record.id, record.file_path, record.file_mimetype)}>Download</a>
      </Menu.Item>
      <Menu.Item key="1">
        <Text type="danger">Delete</Text>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="files-container">
      <Table columns={columns} dataSource={props.files} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default FileList;
