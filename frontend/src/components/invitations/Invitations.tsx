import React, { useEffect } from "react";
import InvitationItem from "./InvitationItem";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getAllInvitations } from "../../actions/invitation";
import Container from "../utils/Container";
import { Table, Space } from "antd";

const Invitations = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((state: RootStateOrAny) => state.invitation.invitations);

  useEffect(() => {
    dispatch(getAllInvitations());
  }, []);

  return (
    <Container size="30">
      <div className="invitations" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Invitations</h1>
        <div className="invitation__box" style={{ width: "50%" }}>
          {invitations.map((item: any) => (
            <InvitationItem data={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Invitations;
