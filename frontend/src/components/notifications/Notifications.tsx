import React, { useEffect, useContext, useState } from "react";
import InvitationItem from "./InvitationItem";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getAllInvitations } from "../../actions/invitation";
import Container from "../utils/Container";
import { Table, Badge, Tabs } from "antd";
import { useParams } from "react-router-dom";
import SocketContext from "../../context/SocketContext";
import { Invitation } from "../../types/types";

const Notifications = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const invitations: Invitation[] = useSelector((state: RootStateOrAny) => state.invitation.invitations);

  const { TabPane } = Tabs;

  const socket = useContext(SocketContext);
  const [email, setEmail] = useState("");

  const invitationHeader = (
    <Badge style={{ position: "relative", left: "5px" }} count={invitations.length}>
      Invitations
    </Badge>
  );

  useEffect(() => {
    dispatch(getAllInvitations());
  }, []);

  return (
    <Container size="30">
      <div className="notifications" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Notifications</h1>
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
