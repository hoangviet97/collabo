import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, DatePicker, Typography, Button, Row, Col, Select, Avatar } from "antd";
import { closeTaskModal } from "../../actions/modal";
import { getModalMembers } from "../../actions/member";
import { getModalProjects } from "../../actions/project";
import { getModalSections } from "../../actions/section";
import { createTask } from "../../actions/task";
import { CloseOutlined, PlusOutlined, BorderOutlined, AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

const TaskModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [projectId, setProjectId] = useState("");
  const isVisible = useSelector((state) => state.modal.taskModal);
  const projects = useSelector((state) => state.project.modalProjects);
  const sections = useSelector((state) => state.section.modalSections);
  const members = useSelector((state) => state.member.modalMembers);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const { TextArea } = Input;
  const { Text } = Typography;

  useEffect(() => {
    projects && dispatch(getModalProjects());
  }, []);

  let path = window.location.pathname;
  let pathValue = path.split("/")[1];

  const closeModal = () => {
    dispatch(closeTaskModal());
  };

  const projectSelected = (value) => {
    setProjectId(value);
    dispatch(getModalSections({ project_id: value }));
    dispatch(getModalMembers({ project_id: value }));
  };

  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue["range-picker"];
    let values;
    let finalObj = [];

    if (fieldsValue.assignees.length > 0) {
      const pom = members.filter((item) => fieldsValue.assignees.includes(item.user_id));
      finalObj = pom.map((item) => item.id);
    }

    values = {
      ...fieldsValue,
      start_date: rangeValue === undefined ? null : rangeValue[0].format("YYYY-MM-DD"),
      due_date: rangeValue === undefined ? null : rangeValue[1].format("YYYY-MM-DD"),
      assignees_members: finalObj
    };

    dispatch(createTask({ project_id: projectId, task: values }));

    form.resetFields();
  };

  return (
    <div className="modal">
      <Modal width={500} bodyStyle={{ overflowY: "scroll", height: "550px" }} visible={isVisible} closable={false} footer={null}>
        <Form form={form} style={{ position: "relative" }} name="complex-form" onFinish={onFinish} initialValues={{ remember: true }}>
          <Form.Item name="title" rules={[{ required: true, message: "Please input task title!" }]}>
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
          <Form.Item name="project" rules={[{ required: true }]}>
            <Select onSelect={(value) => projectSelected(value)} placeholder="Select project" style={{ width: "100%" }}>
              {projects.map((project, index) => (
                <Option key={index} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sectionId" rules={[{ required: true }]}>
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
            <Select mode="multiple" allowClear style={{ width: "100%" }} onChange={(value) => console.log(value)} placeholder="Please select members">
              {members.map((item) => (
                <Option key={item.user_id} value={item.user_id}>
                  {item.firstname} {item.lastname} &nbsp; | &nbsp; {item.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description">
            <TextArea autoSize={{ minRows: 3, maxRows: 3 }} placeholder="Add description" />
          </Form.Item>
          <div>
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button htmlType="submit">Create</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default withRouter(TaskModal);
