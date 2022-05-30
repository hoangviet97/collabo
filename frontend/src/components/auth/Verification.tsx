import React, { useEffect, FC } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { verifyAccount } from "../../actions/auth";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

interface Props {
  match: any;
}

const Verification: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();
  const verified = useSelector((state: RootStateOrAny) => state.auth.verified);

  useEffect(() => {
    dispatch(verifyAccount({ id: match.params.id }));
  }, []);

  const success = () => {
    return (
      <div className="verify-container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
        <h1>Account Activated</h1>

        <div style={{ marginTop: "30px" }}>
          <span>Thank you, your e-mail has been verified. Your account is now active.</span>
          <br />
          <span>Please use this link below to login to your account.</span>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Link to="/login">
            <Button size="large" type="primary">
              Login to your account
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  return <div>{success()}</div>;
};

export default Verification;
