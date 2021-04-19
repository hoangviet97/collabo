import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { Form, Input, DatePicker, Typography, Button, Row, Col, Select, Avatar, Tooltip } from "antd";
import { showTaskModal, closeTaskModal } from "../../actions/modal";
import { getMembers } from "../../actions/member";
import { getProjects } from "../../actions/project";
import { CloseOutlined, PlusOutlined, BorderOutlined, AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AssigneeModal from "./AssingeeModal";

const TaskModal = (props) => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const { TextArea } = Input;
  const { Text } = Typography;

  const [checklist, setChecklist] = useState();
  const [assigneeModal, setAssigneeModal] = useState(false);

  const onChange = (date, dateString) => {
    console.log(dateString);
  };

  const closeModal = () => {
    props.closeTaskModal();
  };

  const openAssigneeModal = () => {
    setAssigneeModal(true);
  };

  const closeAsigneeModal = () => {
    setAssigneeModal(false);
  };

  const addChecklist = () => {};

  return (
    <div className="modal">
      <Modal width={500} bodyStyle={{ overflowY: "scroll", height: "500px" }} visible={props.isVisible} closable={false} footer={null}>
        <Form name="basic" initialValues={{ remember: true }}>
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
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Form.Item>
          <Form.Item name="remember">
            <Row>
              <Col span={13}>
                {/* date picker for task */}
                <RangePicker onChange={onChange} style={{ width: "100%" }} />
              </Col>
              <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
                {/* Avatar icons for adding assignees */}
                <Avatar.Group maxCount={2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </Avatar.Group>
                {/* Button for adding new assignee */}
                <a onClick={openAssigneeModal}>
                  <Avatar style={{ marginLeft: "-8px", marginTop: "-15px" }} size={20} icon={<PlusOutlined />}></Avatar>
                </a>
                {/* Conditional Assignee modal */}
                {assigneeModal && <AssigneeModal close={closeAsigneeModal} projects={props.projects} />}
              </Col>
            </Row>
          </Form.Item>
          <Form.Item name="description" valuePropName="checked">
            <TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder="Add description" />
          </Form.Item>
          <Form.Item name="select">
            <div className="box">
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
            </div>
          </Form.Item>
          <Form.Item name="addChecklist">
            <Button onClick={addChecklist} style={{ border: "none", padding: 0 }}>
              <PlusOutlined />
              Add checklist
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isVisible: state.modal.taskModal,
  projects: state.project.projects
});

export default connect(mapStateToProps, { showTaskModal, closeTaskModal, getMembers, getProjects })(TaskModal);
