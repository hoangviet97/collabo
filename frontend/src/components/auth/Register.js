import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="base-wrapper">
      <div class="auth-header">
        <h1 className="auth-logo">collabo</h1>
      </div>
      <Form className="form-box">
        <div class="form-auth-header">
          <h2>Sign Up</h2>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your e-mail"
            }
          ]}
        >
          <Input placeholder="E-mail" />
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
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="Re-type password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password placeholder="Re-type Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form.Item>
        <div className="form-auth-footer">
          <p>
            Already have an account? <Link to="/"> Login</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;
