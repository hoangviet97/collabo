import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { register } from "../../redux/actions/auth";
import { passwordStrength } from "check-password-strength";
import Img from "../../img/hero_auth.png";
import { AppDispatch } from "../../redux/store";

interface Props {
  history: any;
}

const RegisterPage: React.FunctionComponent<Props> = ({ history }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const isAuthenticated = useSelector((state: RootStateOrAny) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({ email: "", password: "", passwordCheck: "", firstname: "", lastname: "" });
  const [errMsg, setErrMsg] = useState<string>("");
  const { email, password, passwordCheck, firstname, lastname } = formData;

  // Controlled input
  const changeHandler = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send auth data to redux action
  const submitHandler = () => {
    if (passwordStrength(password).value === "Too weak") {
      setErrMsg("Passsword must be at least 6 characters long with letter and number combinations.");
    } else if (password !== passwordCheck) {
      setErrMsg("");
      message.error("Passwords doesn't match!");
    } else {
      setErrMsg("");
      const { push } = history;
      dispatch(register(firstname, lastname, email, password, push));
      form.resetFields();
    }
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
          <div className="name-box">
            <Form.Item name="firstname" rules={[{ required: true, message: "Firstname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
              <Input name="firstname" value={formData.firstname} placeholder="Firstname" onChange={(e) => changeHandler(e)} />
            </Form.Item>

            <Form.Item name="lastname" rules={[{ required: true, message: "Lastname required!" }]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
              <Input name="lastname" value={formData.lastname} placeholder="Lastname" onChange={(e) => changeHandler(e)} />
            </Form.Item>
          </div>

          <Form.Item name="email" rules={[{ required: true, message: "Please input your e-mail" }]}>
            <Input name="email" value={formData.email} placeholder="E-mail" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password name="password" value={formData.password} placeholder="Password" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <Form.Item name="passwordCheck" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password name="passwordCheck" value={formData.passwordCheck} placeholder="Re-type Password" onChange={(e) => changeHandler(e)} />
          </Form.Item>

          <p style={{ color: "red" }}>{errMsg}</p>

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
      <div className="auth__container auth__hero">
        <div>
          <img src={Img} className="auth__img" />
        </div>
      </div>
    </div>
  );
};

export default withRouter(RegisterPage);
