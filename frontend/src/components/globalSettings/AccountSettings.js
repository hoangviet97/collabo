import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { changeName, changePassword } from "../../actions/auth";
import { useDispatch } from "react-redux";

const AccountSettings = ({ profile }) => {
  let formRef = React.createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    formRef.current.setFieldsValue({
      firstname: profile.firstname,
      lastname: profile.lastname
    });
  }, []);

  return (
    <div>
      <Form name="basic" ref={formRef}>
        <Form.Item label="Firstname" name="firstname" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Lastname" name="lastname" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="password" name="password" type="password" rules={[{ required: true, message: "Please input new password" }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountSettings;
