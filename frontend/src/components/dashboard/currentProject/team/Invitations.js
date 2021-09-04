import React, { useEffect, useState } from "react";
import { getAllProjectInvitations } from "../../../../actions/invitation";
import { connect } from "react-redux";
import { Table } from "antd";
import moment from "moment";

const Invitations = (props) => {
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
      render: (date) => <span>{moment(date).format("LL")}</span>
    }
  ];

  return (
    <div className="invitations" style={{ marginTop: "20px" }}>
      <Table dataSource={props.sended} columns={columns} />;
    </div>
  );
};

const mapStateToProps = (state) => ({
  sended: state.invitation.sended
});

export default connect(mapStateToProps, { getAllProjectInvitations })(Invitations);
