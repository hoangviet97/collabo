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
    console.log(password);
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
          <Form.Item name="email" className="auth__element">
            <label for="email">e-mail</label>
            <Input value={email} name="email" size="large" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item name="password" className="auth__element">
            <label for="password">password</label>
            <Input.Password value={password} name="password" size="large" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item className="auth__element">
            <span>Forgot your password?</span>
            <Link to="/reset"> Retrieve</Link>
          </Form.Item>

          <Form.Item className="auth__element">
            <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: "10px" }}>
              Login
            </Button>
          </Form.Item>

          <div className="form-auth-footer" style={{ textAlign: "center" }}>
            <span>
              Don't have an account?{" "}
              <Link to="/register">
                <span style={{ color: "black", textDecoration: "underline" }}>SIGN UP</span>
              </Link>
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

export default connect(mapStateToProps, { login })(Login);
