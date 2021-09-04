import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getMembers } from "../../actions/member";
import { createSession } from "../../actions/session";
import { Modal, Button, DatePicker, TimePicker, Form, Input, Select, Row, Col } from "antd";

const SessionModal = (props) => {
  const { Option } = Select;
  const { TextArea } = Input;

  useEffect(() => {
    props.getMembers({ id: props.project_id });
  }, []);

  const timeHandle = (value) => {
    console.log(moment(value._d).format("LT"));
  };

  const onFinish = (fieldsValue) => {
    const dateVal = fieldsValue.date._d;
    const startTime = fieldsValue.start._d;
    const endTime = fieldsValue.end._d;

    const values = {
      ...fieldsValue,
      date: moment(dateVal).format("YYYY-MM-DD"),
      start: moment(startTime).format("YYYY-MM-DD hh:mm:ss"),
      end: moment(endTime).format("YYYY-MM-DD hh:mm:ss"),
      project_id: props.project_id
    };

    props.createSession({ session: values, project: props.project_id });
  };

  return (
    <Modal title="Basic Modal" width="600px" visible={props.visible} onCancel={props.handleCancel} footer={null}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Event title" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Add participants" name="participants">
          <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select">
            {props.members.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.firstname} {item.lastname}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row>
          <Col span={16} style={{ display: "flex", gap: "10px" }}>
            <Form.Item label="Date" name="date">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Start time" name="start">
              <TimePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="End time" name="end">
              <TimePicker onSelect={timeHandle} format="HH:mm" />
            </Form.Item>
          </Col>
          <Button htmlType="submit">Create</Button>
        </Row>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  members: state.member.members
});

export default connect(mapStateToProps, { getMembers, createSession })(SessionModal);
