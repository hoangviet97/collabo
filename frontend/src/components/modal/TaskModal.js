import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Space } from "antd";
import { connect } from "react-redux";
import { showTaskModal, closeTaskModal } from "../../actions/modal";

const TaskModal = (props) => {
  const layout = {
    labelCol: {
      span: 24
    },
    wrapperCol: {
      span: 24
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  const { Option } = Select;
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const handleOk = () => {
    props.closeTaskModal();
  };

  const handleCancel = () => {
    props.closeTaskModal();
  };

  return (
    <div className="modal">
      <Modal title="New Task" visible={props.isVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="task-modal-wrapper">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true
            }}
          >
            <Form.Item name="username">
              <label>Title</label>
              <Input />
            </Form.Item>

            <Form.Item name="select" hasFeedback rules={[{ required: true, message: "Please select your country!" }]}>
              <label>Select project</label>
              <Select placeholder="Please select a country">
                {props.projects && props.projects.map((project) => <Option value={project.id}>{project.name}</Option>)}
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>

            <Form.Item name="password">
              <label>Set a date</label>
              <RangePicker format="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item name="password">
              <label>Description</label>
              <TextArea rows={3} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isVisible: state.modal.taskModal,
  projects: state.project.projects
});

export default connect(mapStateToProps, { showTaskModal, closeTaskModal })(TaskModal);
