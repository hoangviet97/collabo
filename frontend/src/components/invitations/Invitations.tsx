import React, { useEffect } from "react";
import InvitationItem from "./InvitationItem";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { getAllInvitations } from "../../actions/invitation";
import Container from "../utils/Container";

const Invitations = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((state: RootStateOrAny) => state.invitation.invitations);

  useEffect(() => {
    dispatch(getAllInvitations());
  }, []);

  return (
    <div>
      <Container size="30">
        <h1>Invitations</h1>
        <div className="invitation__box">
          {invitations.map((item: any) => (
            <InvitationItem data={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Invitations;
