import React, { useEffect, FC } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { verifyAccount } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

interface Props {
  match: any;
}

const VerificationPage: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAccount({ id: match.params.id }));
  }, []);

  return (
    <div className="verify-container">
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

export default VerificationPage;
