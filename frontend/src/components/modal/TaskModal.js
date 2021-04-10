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
              <Input placeholder="Task name" />
            </Form.Item>

            <Form.Item name="select" hasFeedback rules={[{ required: true, message: "Please select your country!" }]}>
              <Select placeholder="Select a project">
                {props.projects && props.projects.map((project) => <Option value={project.id}>{project.name}</Option>)}
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>

            <Form.Item name="password">
              <RangePicker format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="password">
              <TextArea rows={3} placeholder="Description" />
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
