import React, { useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Table, Space, Avatar, Select, Menu, Dropdown, Drawer } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import AvatarIcon from "../../../components/utils/AvatarIcon";
import { updateMemberRole, deleteMember, leaveProject } from "../../../redux/actions/member";
import moment from "moment";
import color from "../../../styles/abstract/variables.module.scss";
import { useParams, useHistory } from "react-router-dom";

const MembersPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params: any = useParams();
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const auth = useSelector((state: RootStateOrAny) => state.auth.user);
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);
  const { Option } = Select;

  function roleHandle(id: string, value: string, current: string) {
    dispatch(updateMemberRole({ id: id, project_id: params.id, role_id: value, current_role_id: current }));
  }

  const kickMemberHandle = (id: string, user_id: string) => {
    if (auth.id === user_id) {
      dispatch(leaveProject({ project_id: params.id, history: history }));
    } else {
      dispatch(deleteMember({ id: id, project_id: params.id }));
    }
  };

  const menu = (id: string, user_id: string) => (
    <Menu>
      <Menu.Item key="0" onClick={() => kickMemberHandle(id, user_id)}>
        {user_id === auth.id ? <a>Leave project</a> : <a>Kick member</a>}
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Avatar size="large" style={{ backgroundColor: record.color === null || record.color.length < 1 ? color.normal_orange : record.color }}>
            <AvatarIcon firstname={record.firstname} lastname={record.lastname} />
          </Avatar>
          <span>
            {record.firstname} {record.lastname}
          </span>
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
      render: (text: string, record: any) => (
        <>
          {user_role === "Member" ? (
            <span>{record.role}</span>
          ) : (
            <Select showArrow={false} bordered={false} defaultValue={record.role_id} onChange={(value) => roleHandle(record.id, value, record.role_id)} style={{ width: "100%" }}>
              <Option value="0">Owner</Option>
              <Option value="1">Admin</Option>
              <Option value="2">Member</Option>
            </Select>
          )}
        </>
      )
    },
    {
      title: "Joined",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: Date) => <span>{moment(text).format("MMM Do YYYY")}</span>
    },
    {
      title: "More",
      dataIndex: "more",
      key: "more",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Dropdown disabled={user_role === "Member" ? true : false} overlay={() => menu(record.id, record.user_id)} trigger={["click"]}>
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

export default MembersPage;
