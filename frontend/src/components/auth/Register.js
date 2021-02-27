import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import Password from "antd/lib/input/Password";

const Register = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "", passwordCheck: "", firstname: "", lastname: "" });

  const { email, password, passwordCheck, firstname, lastname } = formData;

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitHandler = () => {
    if (password !== passwordCheck) {
      props.setAlert("Password do not match", "error", 4000);
    } else {
      props.setAlert("match", "error", 4000);
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
          <Form.Item rules={[{ required: true, message: "Firstname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <Input name="firstname" value={firstname} placeholder="Firstname" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item rules={[{ required: true, message: "Lastname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
            <Input name="lastname" value={lastname} placeholder="Lastname" onChange={(e) => changeHandler(e)} />
          </Form.Item>
        </div>

        <Form.Item rules={[{ required: true, type: "email", message: "Please input your e-mail" }]}>
          <Input name="email" value={email} placeholder="E-mail" onChange={(e) => changeHandler(e)} />
        </Form.Item>

        <Form.Item rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password name="password" value={password} placeholder="Password" onChange={(e) => changeHandler(e)} />
        </Form.Item>

        <Form.Item rules={[{ required: true, message: "Please input your password!" }]}>
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

export default connect(null, { setAlert })(Register);
