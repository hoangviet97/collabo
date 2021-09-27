import React, { useState } from "react";
import InviteItem from "./InviteItem";
import { Input, Button, Table, Tag, Space } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const InvitePanel = (props) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
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
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"]
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"]
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"]
    }
  ];

  return (
    <div className="invite-panel">
      <div class="invite-panel__form-box">
        <form class="invite-panel__form">
          <h2 style={{ fontSize: "30px" }}>Invite new member</h2>
          <Input type="email" placeholder="Enter e-mail address" />
          <Button>Invite</Button>
        </form>
      </div>
      <div class="invite-panel__list-box">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default InvitePanel;
