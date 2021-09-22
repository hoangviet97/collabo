import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, DatePicker, Typography, Button, Row, Col, Select, Avatar } from "antd";
import { closeTaskModal } from "../../actions/modal";
import { getMembers } from "../../actions/member";
import { getProjects } from "../../actions/project";
import { getModalSections } from "../../actions/section";
import { createTask } from "../../actions/task";
import { CloseOutlined, PlusOutlined, BorderOutlined, AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import AssigneeModal from "./AssingeeModal";
import { withRouter } from "react-router-dom";

const TaskModal = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.modal.taskModal);
  const projects = useSelector((state) => state.project.projects);
  const sections = useSelector((state) => state.section.modalSections);
  const members = useSelector((state) => state.member.members);
  const [assigneeModal, setAssigneeModal] = useState(false);
  const [assigneesArray, setAssigneesArray] = useState([]);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const { TextArea } = Input;
  const { Text } = Typography;

  useEffect(() => {
    projects && dispatch(getProjects());
  }, []);

  let path = window.location.pathname;
  let pathValue = path.split("/")[1];

  const closeModal = () => {
    dispatch(closeTaskModal());
  };

  const projectSelected = (value) => {
    dispatch(getModalSections({ id: value }));
    dispatch(getMembers({ id: value }));
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

    dispatch(createTask({ task: values, projectId: pathValue }));

    console.log("Received values of form: ", fieldsValue);
  };

  return (
    <div className="modal">
      <Modal width={500} bodyStyle={{ overflowY: "scroll", height: "550px" }} visible={isVisible} closable={false} footer={null}>
        <Form style={{ position: "relative" }} name="complex-form" onFinish={onFinish} initialValues={{ remember: true }}>
          <Form.Item name="title">
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
              {projects.map((project, index) => (
                <Option key={index} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sectionId">
            <Select placeholder="Select section" style={{ width: "100%" }}>
              {sections.map((section, index) => (
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
          </Row>
          <Form.Item name="assignees">
            <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select members">
              {members.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.firstname} {item.lastname} &nbsp; | &nbsp; {item.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
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

export default withRouter(TaskModal);
