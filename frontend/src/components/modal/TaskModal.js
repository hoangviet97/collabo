import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { Form, Input, DatePicker, Typography, Button, Row, Col, Select, Avatar } from "antd";
import { showTaskModal, closeTaskModal } from "../../actions/modal";
import { getMembers } from "../../actions/member";
import { getProjects } from "../../actions/project";
import { getSections } from "../../actions/section";
import { CloseOutlined, PlusOutlined, BorderOutlined, AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AssigneeModal from "./AssingeeModal";

const TaskModal = (props) => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const { TextArea } = Input;
  const { Text } = Typography;

  const [assigneeModal, setAssigneeModal] = useState(false);

  const [formValues, setFormValues] = useState({ name: "", project: 0, section: "", startDate: null, dueDate: null, assignee: "f3dddf6a-8a4e-4148-9398-89d22a060abd", description: "", status: 0, priority: 0 });
  const onSubmit = (data) => console.log(data);

  const onChange = (date, dateString) => {
    console.log(dateString);
  };

  //
  const closeModal = () => {
    props.closeTaskModal();
  };

  const openAssigneeModal = () => {
    setAssigneeModal(true);
  };

  const closeAsigneeModal = () => {
    setAssigneeModal(false);
  };

  const submitForm = () => {
    console.log(formValues.name + " " + formValues.project + " " + formValues.section + " " + formValues.description + " " + formValues.status + " " + formValues.priority);
  };

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];

    const values = {
      ...fieldsValue,
      "range-picker": [rangeValue[0].format("YYYY-MM-DD"), rangeValue[1].format("YYYY-MM-DD")]
    };

    console.log("Received values of form: ", values);
  };

  return (
    <div className="modal">
      <Modal width={500} bodyStyle={{ overflowY: "scroll", height: "500px" }} visible={props.isVisible} closable={false} footer={null}>
        <Form name="complex-form" onFinish={onFinish} initialValues={{ remember: true }}>
          <Form.Item name="name">
            <Row>
              <Col span={22}>
                <Input className="task-name-input" placeholder="Enter task name" />
              </Col>
              <Col span={2} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button style={{ border: "none", padding: 0 }} onClick={closeModal}>
                  <CloseOutlined style={{ fontSize: "20px" }} />
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="project">
            <Select placeholder="Select project" style={{ width: "100%" }}>
              {props.projects.map((project, index) => (
                <Option key={index} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="section">
            <Select placeholder="Select section" style={{ width: "100%" }}>
              {props.sections.map((section, index) => (
                <Option key={index} value={section.id}>
                  {section.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Row>
            <Col span={13}>
              {/* date picker for task */}
              <Form.Item name="range-picker">
                <RangePicker onChange={onChange} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
              {/* Avatar icons for adding assignees */}
              <Form.Item name="assignees">
                <Avatar.Group maxCount={2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </Avatar.Group>
              </Form.Item>
              {/* Button for adding new assignee */}
              <a onClick={openAssigneeModal}>
                <Avatar style={{ marginLeft: "-8px", marginTop: "-15px" }} size={20} icon={<PlusOutlined />}></Avatar>
              </a>
              {/* Conditional Assignee modal */}
              {assigneeModal && <AssigneeModal close={closeAsigneeModal} projects={props.projects} />}
            </Col>
          </Row>
          <Form.Item name="description">
            <TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder="Add description" />
          </Form.Item>
          <div className="box">
            <Form.Item name="status">
              <Select placeholder="Select a status" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Option value="0">
                  <BorderOutlined style={{ fontSize: "10px", color: "transparent", backgroundColor: "#ecf0f1" }} />
                  &nbsp;&nbsp;Open
                </Option>
                <Option value="1">
                  <BorderOutlined style={{ fontSize: "10px", color: "transparent", backgroundColor: "#3498db" }} />
                  &nbsp;&nbsp;In Progress
                </Option>
                <Option value="2">
                  <BorderOutlined style={{ fontSize: "10px", color: "transparent", backgroundColor: "#f1c40f" }} />
                  &nbsp;&nbsp;On Hold
                </Option>
                <Option value="3">
                  <BorderOutlined style={{ fontSize: "10px", color: "transparent", backgroundColor: "#27ae60" }} />
                  &nbsp;&nbsp;Completed
                </Option>
                <Option value="4">
                  <BorderOutlined style={{ fontSize: "10px", color: "transparent", backgroundColor: "#e74c3c" }} />
                  &nbsp;&nbsp;Canceled
                </Option>
              </Select>
            </Form.Item>
            <Form.Item name="priority">
              <Select placeholder="Select a priority" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Option value="0">
                  <Text strong style={{ color: "#f1c40f" }}>
                    Low
                  </Text>
                </Option>
                <Option value="1">
                  <Text strong style={{ color: "#27ae60" }}>
                    Medium
                  </Text>
                </Option>
                <Option value="2">
                  <Text strong style={{ color: "#e74c3c" }}>
                    High
                  </Text>
                </Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item>
            <Button name="add-checklist-btn" style={{ border: "none", padding: 0 }}>
              <PlusOutlined />
              Add checklist
            </Button>
          </Form.Item>

          <div className="bottom" style={{ backgroundColor: "red", position: "absolute", bottom: 0, left: 0, width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" htmlType="submit" name="submit-btn">
              <PlusOutlined />
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isVisible: state.modal.taskModal,
  projects: state.project.projects,
  sections: state.section.sections
});

export default connect(mapStateToProps, { showTaskModal, closeTaskModal, getMembers, getProjects, getSections })(TaskModal);
