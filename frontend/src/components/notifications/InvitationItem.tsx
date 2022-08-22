import React, { FC } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteInvitation, acceptInvitation } from "../../actions/invitation";
import moment from "moment";

interface Props {
  data: any;
}

const InvitationItem: FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const acceptHandler = () => {
    dispatch(acceptInvitation(data.id, data.projects_id));
  };

  const rejectHandler = () => {
    dispatch(deleteInvitation(data.projects_id, data.id));
  };

  return (
    <div className="invitation__item">
      <div>
        <div style={{ fontSize: "16px" }}>
          <span style={{ fontWeight: "bolder" }}>
            {data.firstname} {data.lastname}
          </span>{" "}
          invited you to project <span style={{ fontWeight: "bolder" }}>{data.project_name}</span>
        </div>
        <div>{moment(data.created_at).calendar()}</div>
      </div>
      <div style={{ display: "flex" }}>
        <Button className="invitation__btn" type="primary" onClick={acceptHandler}>
          Accept
        </Button>
        <Button className="invitation__btn" type="ghost" onClick={rejectHandler}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default InvitationItem;
