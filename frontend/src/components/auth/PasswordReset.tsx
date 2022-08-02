import React, { useEffect, FC } from "react";
import { Button, Input, Form } from "antd";
import { Link } from "react-router-dom";
import { verifyAccount } from "../../actions/auth";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";

interface Props {
  match: any;
}

const Verification: FC<Props> = ({ match }) => {
  const dispatch = useDispatch();

  return (
    <div className="verify-container" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
      <h1>Reset your password</h1>
      <Form>
        <Form.Item>
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Input type="password" />
        </Form.Item>
      </Form>
      <div style={{ marginTop: "30px" }}>
        <Link to="/login">
          <Button size="large" type="primary">
            Change
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Verification;
