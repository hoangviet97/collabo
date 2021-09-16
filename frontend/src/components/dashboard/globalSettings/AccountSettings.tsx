import React, { useEffect, FC } from "react";
import { Form, Input, Button } from "antd";

interface Props {
  profile: any;
}

const AccountSettings: FC<Props> = ({ profile }) => {
  let formRef = React.createRef<any>();

  useEffect(() => {
    formRef.current.setFieldsValue({
      firstname: profile.firstname,
      lastname: profile.lastname
    });
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
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
