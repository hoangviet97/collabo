import React, { useState } from "react";
import { Modal, Button, DatePicker, TimePicker, Form, Input, Select, Row, Col } from "antd";

const MeetingModal = (props) => {
  const { Option } = Select;

  return (
    <Modal title="Basic Modal" width="600px" visible={props.visible} onOk={props.handleOk} onCancel={props.handleCancel}>
      <Form layout="vertical">
        <Form.Item label="Event title" name="eventName">
          <Input />
        </Form.Item>

        <Form.Item label="Add participants" name="eventName">
          <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select"></Select>
        </Form.Item>

        <Form.Item label="Place" name="eventName">
          <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select">
            <Option>Skype</Option>
            <Option>Teams</Option>
            <Option>Google Meets</Option>
            <Option>School</Option>
          </Select>
        </Form.Item>

        <Row>
          <Col span={14}>
            <Form.Item label="Start time" name="eventName">
              <DatePicker />
              <TimePicker />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="End time" name="eventName">
              <TimePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MeetingModal;
