import React, { useState } from "react";
import { Input, Form, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../redux/actions/auth";
import { KeyOutlined } from "@ant-design/icons";
import color from "../../styles/abstract/variables.module.scss";
import { AppDispatch } from "../../redux/store";

const ResetPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = () => {
    dispatch(reset(email));
  };

  return (
    <div className="reset">
      <div className="reset__wrapper">
        <div>
          <div className="reset__icon" style={{ backgroundColor: color.light_blue }}>
            <KeyOutlined style={{ fontSize: "40px", color: color.normal_blue, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          </div>
          <div style={{ fontSize: "30px" }}>Forgot password?</div>
          <div style={{ fontSize: "15px", marginBottom: "40px", marginTop: "10px" }}>We'll send you a link to your e-mail to reset your password</div>
          <Form onFinish={submitHandler} className="auth__form" style={{ marginBottom: "50px", position: "relative", left: "50%", transform: "translateX(-50%)" }}>
            <Form.Item name="email" className="auth__element">
              <Input value={email} name="email" size="large" style={{ borderRadius: "10px" }} placeholder="Enter your e-mail address" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item className="auth__element" style={{ width: "100%" }}>
              <Button className="reset__btn" type="primary" htmlType="submit" size="large">
                Send
              </Button>
            </Form.Item>
          </Form>

          <Link to="/login">
            <span className="reset__link-back">Go back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
