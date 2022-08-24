import React, { FC } from "react";
import { Button, Input, Form, message } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { setNewPassword } from "../../actions/auth";
import { useDispatch } from "react-redux";

const Verification = () => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const history = useHistory();

  const submitHandler = (value: any) => {
    if (value.password !== value.password_check) {
      message.error("Passwords do not match!");
    } else {
      dispatch(setNewPassword({ token: params.id, password: value.password, history: history }));
    }
  };

  return (
    <div className="verify-container">
      <h1>Reset your password</h1>
      <div>
        <Form onFinish={submitHandler}>
          <Form.Item name="password">
            <Input type="password" />
          </Form.Item>
          <Form.Item name="password_check">
            <Input type="password" />
          </Form.Item>
          <div style={{ marginTop: "30px" }}>
            <Button htmlType="submit" size="large" type="primary">
              Change
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Verification;
