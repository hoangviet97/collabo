import React, { useState } from "react";
import { Input, Form, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../actions/auth";

const Reset = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(reset({ email: email }));
  };

  return (
    <div class="reset-box" style={{ position: "relative", top: "25%", left: "25%", transform: "translateY(80%)" }}>
      <div>
        <h2>Enter your e-mail adress</h2>
        <Form onFinish={submitHandler} className="auth__form">
          <Form.Item name="email" className="auth__element">
            <label for="email">e-mail</label>
            <Input value={email} name="email" size="large" onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item className="auth__element">
            <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: "10px" }}>
              Send
            </Button>
          </Form.Item>
        </Form>

        <Link to="/login">
          <span style={{ color: "black", textDecoration: "underline" }}>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default Reset;
