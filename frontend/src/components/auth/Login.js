import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = () => {
    console.log(formData);
  };

  return (
    <div className="base-wrapper">
      <div className="auth-header">
        <h1 className="auth-logo">collabo</h1>
      </div>
      <Form onFinish={submitHandler} className="form-box">
        <div className="form-auth-header">
          <h2>Sign In</h2>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your e-mail"
            }
          ]}
        >
          <Input value={email} name="email" placeholder="E-mail" onChange={(e) => changeHandler(e)} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password value={password} name="password" placeholder="Password" onChange={(e) => changeHandler(e)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form.Item>

        <div className="form-auth-footer">
          <p>
            Don't have an account? <Link to="/register"> Register</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
