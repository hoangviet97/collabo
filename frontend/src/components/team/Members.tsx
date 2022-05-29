import React, { useState, FC } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Table, Space, Avatar, Select, Menu, Dropdown, Drawer } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import AvatarIcon from "../utils/AvatarIcon";
import { updateMemberRole, deleteMember } from "../../actions/member";
import moment from "moment";

interface Props {
  projectId: string;
}

const Members: FC<Props> = ({ projectId }) => {
  const dispatch = useDispatch();
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);
  const { Option } = Select;
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  function roleHandle(id: string, value: any) {
    dispatch(updateMemberRole({ id: id, project: projectId, role_id: value }));
  }

  const kickMemberHandle = (id: string) => {
    dispatch(deleteMember({ id: id, project: projectId }));
  };

  const drawerCloseHandler = () => {
    setDrawerVisible(false);
  };

  const menu = (id: string) => (
    <Menu>
      <Menu.Item key="0" onClick={() => kickMemberHandle(id)}>
        <a>Kick member</a>
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
          <Avatar size="large">
            <AvatarIcon name={record.firstname} />
          </Avatar>
          <a onClick={() => setDrawerVisible(true)}>
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
      render: (text: string, record: any) => (
        <Space size="middle">
          {user_role === "Member" ? (
            <span>{record.role}</span>
          ) : (
            <Select showArrow={false} bordered={false} defaultValue={record.role_id} onChange={(value) => roleHandle(record.id, value)} style={{ width: "100%" }}>
              <Option value="0">Owner</Option>
              <Option value="1">Admin</Option>
              <Option value="2">Member</Option>
            </Select>
          )}
        </Space>
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
      <Drawer width={640} placement="right" closable={false} onClose={drawerCloseHandler} visible={drawerVisible}>
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p>
      </Drawer>
    </div>
  );
};

export default Members;
