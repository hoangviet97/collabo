import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getMembers } from "../../actions/member";
import { Modal, Button, DatePicker, TimePicker, Form, Input, Select, Row, Col } from "antd";

const MeetingModal = (props) => {
  const { Option } = Select;

  useEffect(() => {
    props.getMembers({ id: props.id });
  }, []);

  return (
    <Modal title="Basic Modal" width="600px" visible={props.visible} onOk={props.handleOk} onCancel={props.handleCancel}>
      <Form layout="vertical">
        <Form.Item label="Event title" name="title">
          <Input />
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

        <Form.Item label="Place" name="place">
          <Select style={{ width: "100%" }} placeholder="Please select">
            <Option value="Skype">Skype</Option>
            <Option value="Teams">Teams</Option>
            <Option value="Google">Google Meets</Option>
            <Option value="School">School</Option>
          </Select>
        </Form.Item>

        <Row>
          <Col span={14}>
            <Form.Item label="Start time" name="start">
              <DatePicker />
              <TimePicker />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item label="End time" name="end">
              <TimePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  members: state.member.members
});

export default connect(mapStateToProps, { getMembers })(MeetingModal);
