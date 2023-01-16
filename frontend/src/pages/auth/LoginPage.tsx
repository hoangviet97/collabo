import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { login } from "../../redux/actions/auth";
import { AppDispatch } from "../../redux/store";

const LoginPage: React.FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootStateOrAny) => state.auth.isAuthenticated);
  const isLoading = useSelector((state: RootStateOrAny) => state.auth.loading);
  const [formData, setFormData] = useState<{ email: string; password: string }>({ email: "", password: "" });

  const { email, password } = formData;

  // Controlled input
  const changeHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send auth data to redux action
  const submitHandler = () => {
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth__wrapper">
      <div className="auth__container auth__form-container">
        <h1 className="auth__title">
          <span style={{ fontWeight: "lighter" }}>COLLA</span>
          <span style={{ color: "#031428" }}>BOAT</span>
        </h1>
        <Form onFinish={submitHandler} className="auth__form">
          <Form.Item name="email" className="auth__element">
            <label htmlFor="email">e-mail</label>
            <Input value={email} name="email" size="large" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item name="password" className="auth__element">
            <label htmlFor="password">password</label>
            <Input.Password value={password} name="password" size="large" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item className="auth__element">
            <span>Forgot your password?</span>
            <Link to="/reset"> Retrieve</Link>
          </Form.Item>

          <Form.Item className="auth__element">
            <Button type="primary" htmlType="submit" size="large" style={{ borderRadius: "10px" }}>
              {isLoading ? "loading..." : "Login"}
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
      <div className="auth__container auth__hero"></div>
    </div>
  );
};

export default LoginPage;
