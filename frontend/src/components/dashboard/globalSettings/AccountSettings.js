import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";

const AccountSettings = ({ profile }) => {
  let formRef = React.createRef();

  useEffect(() => {
    formRef.current.setFieldsValue({
      firstname: profile.firstname,
      lastname: profile.lastname
    });
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form name="basic" ref={formRef}>
        <Form.Item label="Firstname" name="firstname" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Lastname" name="lastname" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submite
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountSettings;
