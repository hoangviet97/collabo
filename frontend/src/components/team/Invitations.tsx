import React from "react";
import { deleteInvitation } from "../../actions/invitation";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Table, Space, Button } from "antd";
import moment from "moment";
import { useParams } from "react-router-dom";

const Invitations: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const sended = useSelector((state: RootStateOrAny) => state.invitation.sended);

  const deleteRecordHandler = (id: string) => {
    dispatch(deleteInvitation(params.id, id));
  };

  const columns = [
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "created_at",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: Date) => <span>{moment(date).format("LL")}</span>
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => deleteRecordHandler(record.id)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div className="invitations" style={{ marginTop: "20px" }}>
      <Table dataSource={sended} columns={columns} />;
    </div>
  );
};

export default Invitations;
