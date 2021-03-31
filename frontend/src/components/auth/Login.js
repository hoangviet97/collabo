import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  // Controlled input
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send auth data to redux action
  const submitHandler = () => {
    props.login({ email, password });
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
