import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { connect } from "react-redux";
import { Form, Input, DatePicker, Typography, Button, Row, Col, Select, Avatar } from "antd";
import { showTaskModal, closeTaskModal } from "../../actions/modal";
import { getMembers } from "../../actions/member";
import { getProjects } from "../../actions/project";
import { getModalSections } from "../../actions/section";
import { createTask } from "../../actions/task";
import { CloseOutlined, PlusOutlined, BorderOutlined, AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AssigneeModal from "./AssingeeModal";
import { withRouter } from "react-router-dom";

const TaskModal = (props) => {
  useEffect(() => {
    props.projects.length === 0 && props.getProjects();
  }, []);

  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const { TextArea } = Input;
  const { Text } = Typography;

  let path = window.location.pathname;
  let pathValue = path.split("/")[1];

  const [assigneeModal, setAssigneeModal] = useState(false);
  const [assigneesArray, setAssigneesArray] = useState([]);

  const closeModal = () => {
    props.closeTaskModal();
  };

  const openAssigneeModal = () => {
    setAssigneeModal(true);
  };

  const closeAsigneeModal = () => {
    setAssigneeModal(false);
  };

  const projectSelected = (value) => {
    props.getModalSections({ id: value });
    props.getMembers({ id: value });
  };

  const assigneeSelected = (id) => {
    setAssigneesArray((assigneesArray) => [...assigneesArray, id]);
  };

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];
    let values;

    if (rangeValue === undefined || rangeValue === null) {
      values = {
        ...fieldsValue,
        start_date: null,
        due_date: null,
        assigneesArray
      };
    } else {
      values = {
        ...fieldsValue,
        start_date: rangeValue[0].format("YYYY-MM-DD"),
        due_date: rangeValue[1].format("YYYY-MM-DD"),
        assigneesArray
      };
    }

    props.createTask({ task: values, projectId: pathValue });

    console.log("Received values of form: ", values);

    setAssigneesArray([]);
  };

  return (
    <div className="modal">
      <Modal width={500} bodyStyle={{ overflowY: "scroll", height: "550px" }} visible={props.isVisible} closable={false} footer={null}>
        <Form style={{ position: "relative" }} name="complex-form" onFinish={onFinish} initialValues={{ remember: true }}>
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
            <Select onSelect={(value) => projectSelected(value)} placeholder="Select project" style={{ width: "100%" }}>
              {props.projects.map((project, index) => (
                <Option key={index} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sectionId">
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
                <RangePicker allowClear="true" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={11} style={{ display: "flex", justifyContent: "center" }}>
              {/* Avatar icons for adding assignees */}
              <Form.Item>
                <Avatar.Group maxCount={2} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  {assigneesArray.map((assignee) => (
                    <Avatar key={assignee.id} />
                  ))}
                </Avatar.Group>
              </Form.Item>
              {/* Button for adding new assignee */}
              {assigneesArray.length > 0 ? (
                <a onClick={openAssigneeModal}>
                  <Avatar style={{ marginLeft: "-8px", marginTop: "-15px" }} size={20} icon={<PlusOutlined />}></Avatar>
                </a>
              ) : (
                <Button type="dashed" onClick={openAssigneeModal}>
                  <PlusOutlined />
                  <span>Add assignee</span>
                </Button>
              )}
              {/* Conditional Assignee modal */}
              {assigneeModal && <AssigneeModal close={closeAsigneeModal} assigneeSelected={assigneeSelected} members={props.members} />}
            </Col>
          </Row>
          <Form.Item name="description">
            <TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder="Add description" />
          </Form.Item>
          <div className="box">
            <Row>
              <Col span={12}>
                <Form.Item name="statusId">
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
              </Col>
              <Col span={12}>
                <Form.Item name="priorityId">
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
              </Col>
            </Row>
          </div>
          <Form.Item>
            <Button style={{ border: "none", padding: 0 }}>
              <PlusOutlined />
              Add checklist
            </Button>
          </Form.Item>
          <Button htmlType="submit">Create</Button>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isVisible: state.modal.taskModal,
  projects: state.project.projects,
  sections: state.section.modalSections,
  members: state.member.members
});

export default connect(mapStateToProps, { showTaskModal, closeTaskModal, getMembers, getProjects, getModalSections, createTask })(withRouter(TaskModal));
