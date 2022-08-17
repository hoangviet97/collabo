import React, { useEffect, useContext, useState } from "react";
import InvitationItem from "./InvitationItem";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getAllInvitations } from "../../actions/invitation";
import Container from "../utils/Container";
import SocketContext from "../../context/SocketContext";
import { Invitation } from "../../types/types";

const Notifications: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const invitations: Invitation[] = useSelector((state: RootStateOrAny) => state.invitation.invitations);

  useEffect(() => {
    dispatch(getAllInvitations());
  }, []);

  return (
    <Container size="30">
      <div className="invitation">
        <h1>Invitations</h1>
        <div className="invitation__box" style={{ width: "60%" }}>
          {invitations.map((item: Invitation, index: number) => (
            <InvitationItem key={index} data={item} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Notifications;
