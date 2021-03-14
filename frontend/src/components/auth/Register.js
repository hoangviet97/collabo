import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

const Register = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "", passwordCheck: "", firstname: "", lastname: "" });

  const { email, password, passwordCheck, firstname, lastname } = formData;

  // Controlled input
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send auth data to redux action
  const submitHandler = () => {
    if (password !== passwordCheck) {
      message.error("Passwords doesn't match!");
    } else {
      props.register({ firstname, lastname, email, password });
    }
  };

  return (
    <div className="base-wrapper">
      <div className="auth-header">
        <h1 className="auth-logo">collabo</h1>
      </div>
      <Form onFinish={submitHandler} className="form-box">
        <div className="form-auth-header">
          <h2>Create Your Free Account</h2>
        </div>

        <div className="name-box">
          <Form.Item name="firstname" rules={[{ required: true, message: "Firstname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <Input name="firstname" value={firstname} placeholder="Firstname" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item name="lastname" rules={[{ required: true, message: "Lastname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <Input name="lastname" value={lastname} placeholder="Lastname" onChange={(e) => changeHandler(e)} />
          </Form.Item>
        </div>

        <Form.Item name="email" rules={[{ required: true, message: "Please input your e-mail" }]}>
          <Input name="email" value={email} placeholder="E-mail" onChange={(e) => changeHandler(e)} />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password name="password" value={password} placeholder="Password" onChange={(e) => changeHandler(e)} />
        </Form.Item>

        <Form.Item name="passwordCheck" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password name="passwordCheck" value={passwordCheck} placeholder="Re-type Password" onChange={(e) => changeHandler(e)} />
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

export default connect(null, { register })(Register);
