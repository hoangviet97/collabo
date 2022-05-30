import React, { FC } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteInvitation, acceptInvitation } from "../../actions/invitation";

interface Props {
  data: any;
}

const InvitationItem: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const acceptHandler = () => {
    dispatch(acceptInvitation({ id: data.id, project: data.projects_id }));
  };

  const rejectHandler = () => {
    dispatch(deleteInvitation({ id: data.id }));
  };

  return (
    <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px", padding: "15px 20px" }}>
      <div style={{ fontSize: "16px" }}>
        <span style={{ fontWeight: "bolder" }}>
          {data.firstname} {data.lastname}
        </span>{" "}
        invited you to project <span style={{ fontWeight: "bolder" }}>{data.project_name}</span>
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <Button style={{ marginRight: "5px", borderRadius: "5px" }} type="primary" onClick={acceptHandler}>
          Accept
        </Button>
        <Button style={{ borderRadius: "5px" }} type="ghost" onClick={rejectHandler}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default InvitationItem;
