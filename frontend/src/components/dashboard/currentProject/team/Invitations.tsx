import React, { FC } from "react";
import { getAllProjectInvitations } from "../../../../actions/invitation";
import { connect, useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Table } from "antd";
import moment from "moment";

const Invitations: FC = () => {
  const sended = useSelector((state: RootStateOrAny) => state.invitation.sended);
  const columns = [
    {
      title: "firstname",
      dataIndex: "firstname",
      key: "firstname"
    },
    {
      title: "lastname",
      dataIndex: "lastname",
      key: "lastname"
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: any) => <span>{moment(date).format("LL")}</span>
    }
  ];

  return (
    <div className="invitations" style={{ marginTop: "20px" }}>
      <Table dataSource={sended} columns={columns} />;
    </div>
  );
};

export default Invitations;
