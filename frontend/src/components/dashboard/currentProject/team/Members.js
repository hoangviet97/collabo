import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Input, Table, Space, Avatar, Select, Menu, Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import AvatarIcon from "../../../utils/AvatarIcon";
import { updateMemberRole, deleteMember } from "../../../../actions/member";
import moment from "moment";

const Members = ({ members, projectId, updateMemberRole, deleteMember }) => {
  const { Option } = Select;

  function roleHandle(id, value) {
    updateMemberRole({ id: id, project: projectId, role_id: value });
    console.log(id + " " + value);
  }

  const kickMemberHandle = (id) => {
    deleteMember({ id: id, project: projectId });
  };

  const menu = (id) => (
    <Menu>
      <Menu.Item key="0" onClick={() => kickMemberHandle(id)}>
        <a>Kick member</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>2nd menu item</a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Space size="middle">
          <Avatar size="large">
            <AvatarIcon name={record.firstname} />
          </Avatar>
          <a>
            {record.firstname} {record.lastname}
          </a>
        </Space>
      )
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      render: (text, record) => (
        <Space size="middle">
          <Select showArrow={false} bordered={false} defaultValue={record.role_id} onChange={(value) => roleHandle(record.id, value)} style={{ width: "100%" }}>
            <Option value="0">Owner</Option>
            <Option value="1">Admin</Option>
            <Option value="2">Member</Option>
          </Select>
        </Space>
      )
    },
    {
      title: "Joined",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <span>{moment(text).format("MMM Do YYYY")}</span>
    },
    {
      title: "More",
      dataIndex: "more",
      key: "more",
      render: (text, record) => (
        <Space size="middle">
          <Dropdown overlay={() => menu(record.id)} trigger={["click"]}>
            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </Space>
      )
    }
  ];

  return (
    <div className="members" style={{ marginTop: "20px" }}>
      <Table dataSource={members} columns={columns} />;
    </div>
  );
};

const mapStateToProps = (state) => ({
  members: state.member.members
});

export default connect(mapStateToProps, { updateMemberRole, deleteMember })(Members);
