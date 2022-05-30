import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { changeName, changePassword } from "../../actions/auth";
import { useDispatch } from "react-redux";

const AccountSettings = () => {
  let formRef = React.createRef();
  const dispatch = useDispatch();

  return <div></div>;
};

export default AccountSettings;
