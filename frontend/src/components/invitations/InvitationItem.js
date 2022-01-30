import React from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteInvitation } from "../../actions/invitation";

const InvitationItem = ({ data }) => {
  const dispatch = useDispatch();

  const acceptHandler = () => {
    dispatch();
  };

  const rejectHandler = () => {
    dispatch(deleteInvitation());
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
