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
    <div style={{ backgroundColor: "grey" }}>
      <p>
        {data.firstname} {data.lastname} invited you to {data.project_name}
      </p>
      <p>
        <Button onClick={acceptHandler}>Accept</Button>
        <Button onClick={rejectHandler}>Reject</Button>
      </p>
    </div>
  );
};

export default InvitationItem;
