import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import Google from "../../img/icons/Google";
import Facebook from "../../img/icons/Facebook";
import Apple from "../../img/icons/Apple";

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
      const { push } = props.history;
      props.register({ firstname, lastname, email, password, push });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth__wrapper">
      <div class="auth__container auth__form-container">
        <h1 style={{ letterSpacing: "1px", marginBottom: "30px" }}>
          <span style={{ fontWeight: "lighter" }}>COLLA</span>
          <span style={{ color: "#031428" }}>BOAT</span>
        </h1>
        <Form onFinish={submitHandler} className="auth__form">
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

          <Form.Item className="auth__element">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign Up
            </Button>
          </Form.Item>

          <div className="auth__element">
            <span>
              Already have an account? <Link to="/login"> Login</Link>
            </span>
          </div>
        </Form>
      </div>
      <div class="auth__container auth__project-info-container"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withRouter(connect(mapStateToProps, { register })(Register));
