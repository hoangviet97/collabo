import React, { useEffect } from "react";
import InvitationItem from "./InvitationItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvitations } from "../../actions/invitation";
import Container from "../../components/utils/Container";

const Invitations = () => {
  const dispatch = useDispatch();
  const invitations = useSelector((state) => state.invitation.invitations);

  useEffect(() => {
    dispatch(getAllInvitations());
  }, []);

  return (
    <div>
      <Container size="30">
        <h1>Invitations</h1>
        <div class="invitation__box">
          {invitations.map((item) => (
            <InvitationItem data={item} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Invitations;
