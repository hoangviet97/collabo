import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Form, Input, DatePicker, Typography, Button, Row, Col, Select } from "antd";
import { closeTaskModal } from "../../redux/actions/modal";
import { getModalMembers } from "../../redux/actions/member";
import { getModalProjects } from "../../redux/actions/project";
import { getModalSections } from "../../redux/actions/section";
import { createTask } from "../../redux/actions/task";
import { CloseOutlined, BorderOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { member, section, project } from "../../types/types";

const TaskModal: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [projectId, setProjectId] = useState<string>("");
  const isVisible = useSelector((state: RootStateOrAny) => state.modal.taskModal);
  const projects = useSelector((state: RootStateOrAny) => state.project.modalProjects);
  const sections = useSelector((state: RootStateOrAny) => state.section.modalSections);
  const members = useSelector((state: RootStateOrAny) => state.member.modalMembers);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const { TextArea } = Input;
  const { Text } = Typography;

  useEffect(() => {
    projects && dispatch(getModalProjects());
  }, []);

  const closeModal = () => {
    dispatch(closeTaskModal());
  };

  const projectSelected = (value: string) => {
    setProjectId(value);
    dispatch(getModalSections(value));
    dispatch(getModalMembers({ project_id: value }));
  };

  const onFinish = (fieldsValue: any) => {
    const rangeValue = fieldsValue["range-picker"];
    let values;
    let finalObj = [];

    if (fieldsValue.assignees !== undefined) {
      const pom = members.filter((item: member) => fieldsValue.assignees.includes(item.user_id));
      finalObj = pom.map((item: member) => item.id);
    }

    values = {
      ...fieldsValue,
      start_date: rangeValue === undefined ? null : rangeValue[0].format("YYYY-MM-DD"),
      due_date: rangeValue === undefined ? null : rangeValue[1].format("YYYY-MM-DD"),
      assignees_members: finalObj
    };

    dispatch(createTask(projectId, values));

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
            <Select onSelect={(value: any) => projectSelected(value)} placeholder="Select project" style={{ width: "100%" }}>
              {projects.map((project: project, index: number) => (
                <Option key={index} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="sectionId" rules={[{ required: true }]}>
            <Select placeholder="Select section" style={{ width: "100%" }}>
              {sections.map((section: section, index: number) => (
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
                <RangePicker allowClear={true} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="assignees">
            <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select members">
              {members.map((item: member) => (
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
                  <Select placeholder="Select a status" optionFilterProp="children">
                    <Option value="0">
                      <BorderOutlined className="task__status-select" style={{ backgroundColor: "#ecf0f1" }} />
                      &nbsp;&nbsp;Open
                    </Option>
                    <Option value="1">
                      <BorderOutlined className="task__status-select" style={{ backgroundColor: "#3498db" }} />
                      &nbsp;&nbsp;In Progress
                    </Option>
                    <Option value="2">
                      <BorderOutlined className="task__status-select" style={{ backgroundColor: "#f1c40f" }} />
                      &nbsp;&nbsp;On Hold
                    </Option>
                    <Option value="3">
                      <BorderOutlined className="task__status-select" style={{ backgroundColor: "#27ae60" }} />
                      &nbsp;&nbsp;Completed
                    </Option>
                    <Option value="4">
                      <BorderOutlined className="task__status-select" style={{ backgroundColor: "#e74c3c" }} />
                      &nbsp;&nbsp;Canceled
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="priorityId">
                  <Select placeholder="Select a priority" optionFilterProp="children">
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
