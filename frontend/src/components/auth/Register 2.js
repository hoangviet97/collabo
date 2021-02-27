import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "", passwordCheck: "", firstname: "", lastname: "" });

  return (
    <div className="base-wrapper">
      <div className="auth-header">
        <h1 className="auth-logo">collabo</h1>
      </div>
      <Form className="form-box">
        <div className="form-auth-header">
          <h2>Create Your Free Account</h2>
        </div>

        <div class="name-box">
          <Form.Item rules={[{ required: true, message: "Firstname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <Input placeholder="Firstname" />
          </Form.Item>

          <Form.Item rules={[{ required: true, message: "Lastname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <Input placeholder="Lastname" />
          </Form.Item>
        </div>
        <Form.Item rules={[{ required: true, message: "Please input your e-mail" }]}>
          <Input placeholder="E-mail" />
        </Form.Item>

        <Form.Item rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item rules={[{ required: true, message: "Please input your password!" }]}>
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
