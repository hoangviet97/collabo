import React, { useState, useEffect, FC } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getMembers } from "../../actions/member";
import { createSession } from "../../actions/session";
import { Modal, Button, DatePicker, TimePicker, Form, Input, Select, Row, Col, message } from "antd";

interface Props {
  project_id: string;
  visible: boolean;
  handleCancel: any;
  handleOk: any;
}

const SessionModal: FC<Props> = ({ project_id, visible, handleCancel, handleOk }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    dispatch(getMembers({ project_id: project_id }));
  }, []);

  const timeHandle = (value: any) => {
    console.log(moment(value._d).format("LT"));
  };

  const onFinish = (fieldsValue: any) => {
    const dateVal = fieldsValue.date._d;
    const startTime = fieldsValue.start._d;
    const endTime = fieldsValue.end._d;

    const values = {
      ...fieldsValue,
      date: moment(dateVal).format("YYYY-MM-DD"),
      start: moment(startTime).format("YYYY-MM-DD hh:mm:ss"),
      end: moment(endTime).format("YYYY-MM-DD hh:mm:ss"),
      project_id: project_id
    };

    if (startTime > endTime) {
      message.error("End time cannot be sooner than start time!");
    } else {
      dispatch(createSession({ session: values, project_id: project_id }));
      form.resetFields();
    }
  };

  return (
    <Modal title="Create New Session" width="600px" visible={visible} onCancel={handleCancel} footer={null}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Event title" rules={[{ required: true, message: "Please input your title!" }]} name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Place" name="place">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item label="Add participants" name="participants">
          <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select">
            {members.map((item: any) => (
              <Option key={item.id} value={item.id}>
                {item.firstname} {item.lastname}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row>
          <Col span={16} style={{ display: "flex", gap: "10px" }}>
            <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please input your date!" }]}>
              <DatePicker />
            </Form.Item>
            <Form.Item label="Start time" name="start" rules={[{ required: true, message: "Please input your start time!" }]}>
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="End time" name="end" rules={[{ required: true, message: "Please input your end time!" }]}>
              <TimePicker onSelect={timeHandle} format="HH:mm" />
            </Form.Item>
          </Col>
          <Button htmlType="submit">Create</Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default SessionModal;
