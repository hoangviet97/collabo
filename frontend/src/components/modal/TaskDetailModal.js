import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Modal, Input, Select, Avatar, Popover, Divider, Progress, Tag } from "antd";
import { EditOutlined, UserAddOutlined, MinusOutlined, PlusOutlined, CheckOutlined, TagsOutlined } from "@ant-design/icons";
import moment from "moment";
import AvatarIcon from "../utils/AvatarIcon";
import { useDispatch, useSelector } from "react-redux";
import { createTag } from "../../actions/tag";
import { setBudget, setProgress, setDescription } from "../../actions/task";

const TaskDetailModal = ({ task, tags, projectId, assignees, isVisible, closeModal }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [tagGroup, setTagGroup] = useState([]);
  const [budget, setmyBudget] = useState(task.budget);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [percent, setPercent] = useState(task.progress);
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [children, setChildren] = useState([]);
  const { TextArea } = Input;
  const { Option } = Select;
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskTitle(task.title);
    setmyBudget(task.budget);
    setPercent(task.progress);
    setTaskDescription(task.description);

    return () => {
      setTaskTitle("");
    };
  }, [task]);

  useEffect(() => {
    const child = [];
    for (let i = 0; i < tags.length; i++) {
      child.push(
        <Option key={tags[i].id}>
          <div>
            <TagsOutlined />
            &nbsp;
            {tags[i].name}
          </div>
        </Option>
      );
    }

    setChildren(child);
  }, [tags]);

  const showTextAreaHandler = () => {
    setShowTextArea(true);
  };

  const confirmDescription = () => {
    console.log(taskDescription);
    dispatch(setDescription({ id: task.id, description: taskDescription }));
    setShowTextArea(false);
  };

  const showTitleInputHandler = () => {
    setShowTitleInput((prev) => !prev);
  };

  const increase = () => {
    let per = percent + 10;
    if (per > 100) {
      per = 100;
    }
    setPercent(per);
  };

  const decline = () => {
    let per = percent - 10;
    if (per > 100) {
      per = 100;
    }
    setPercent(per);
  };

  const tagInputValueHandler = () => {};

  const tagInputConfirmHandler = () => {
    if (tagInputValue.length > 0) {
      dispatch(createTag({ project: projectId, name: tagInputValue, color: "green" }));
    }
    setTagInputVisible(false);
  };

  const setBudgetHandler = () => {
    dispatch(setBudget({ id: task.id, budget: budget, project: projectId }));
  };

  const setProgressHandler = () => {
    dispatch(setProgress({ id: task.id, progress: percent }));
  };

  return (
    <Modal visible={isVisible} width="50%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}>
      <div className="task__detail">
        <header className="task__detail__header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#f5f6fa", padding: "8px 12px" }}>
          <div className="task__detail-bread" style={{ backgroundColor: "white", padding: "5px 12px", border: "0.5px solid grey", borderRadius: "10px" }}>
            <Breadcrumb>
              <Breadcrumb.Item>{task.section_name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Button style={{ borderRadius: "10px" }} onClick={() => closeModal()}>
            X
          </Button>
        </header>
        <div className="task__detail-body" style={{ width: "100%", height: "100%", display: "flex" }}>
          <div className="task__detail-data" style={{ width: "100%", height: "100%", padding: "20px" }}>
            <div class="task__detail__meta">
              <div className="task__detail__title" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                {showTitleInput ? <Input value={taskTitle} /> : <h2>{taskTitle}</h2>}
                <Button onClick={showTitleInputHandler} shape="round" type="dashed" icon={<EditOutlined />}></Button>
              </div>
              <div class="task__detail__created">
                <table width="100%">
                  <tr>
                    <td style={{ width: "25%" }}>
                      <span>Created</span>
                    </td>
                    <td>
                      <span>{moment(task.created_at).format("MMM Do YYYY")}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "40%" }}>
                      <span>Status</span>
                    </td>
                    <td>
                      <span>{task.statusName}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "40%" }}>
                      <span>Priority</span>
                    </td>
                    <td>
                      <Select className="task-select" defaultValue={task.priorityId} showArrow={false} style={{ width: "50%" }} bordered={false}>
                        <Option value="0">
                          <Tag color="gold">Low</Tag>
                        </Option>
                        <Option value="1">
                          <Tag color="orange">Medium</Tag>
                        </Option>
                        <Option value="2">
                          <Tag color="red">High</Tag>
                        </Option>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "40%" }}>
                      <span>Deadline</span>
                    </td>
                    <td>
                      <span>{task.due_date !== null ? moment(task.due_date).format("MMM Do YYYY") : "set date"}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ width: "40%" }}>
                      <span>Participants</span>
                    </td>
                    <td>
                      {task.assignees.length > 0 ? (
                        <>
                          <Avatar.Group size={32} maxCount={1} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                            {task.assignees.map((assignee, index) => (
                              <Popover key={index} content={assignee.firstname}>
                                <Avatar key={index} style={{ backgroundColor: "#1890ff" }}>
                                  <AvatarIcon name={assignee.firstname} />
                                </Avatar>
                              </Popover>
                            ))}
                          </Avatar.Group>
                          <div style={{ position: "absolute", width: "20px", height: "20px", marginTop: "-40px", borderRadius: "50%", marginLeft: "32px", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "9999" }}>
                            <EditOutlined style={{ fontSize: "7px", color: "#bdc3c7" }} />
                          </div>
                        </>
                      ) : (
                        <div style={{ width: "30px", height: "30px", borderRadius: "50%", border: "0.7px dotted #bdc3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <UserAddOutlined style={{ fontSize: "20px", color: "#bdc3c7" }} />
                        </div>
                      )}
                    </td>
                  </tr>
                </table>
              </div>
              <Divider />
              <div>
                <div class="description__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h4>Description</h4>
                  {showTextArea ? <Button onClick={confirmDescription} shape="round" type="dashed" icon={<CheckOutlined />}></Button> : <Button onClick={showTextAreaHandler} shape="round" type="dashed" icon={<EditOutlined />}></Button>}
                </div>
                <div>{showTextArea ? <TextArea rows="5" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} onBlur={confirmDescription} /> : <p>{task.description}</p>}</div>
              </div>
              <Divider />
              <div class="task-budget">
                <div className="tag__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h4>Tags</h4>
                  <Button onClick={showTextAreaHandler} shape="round" type="dashed" icon={<EditOutlined />}></Button>
                </div>
                <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Please select">
                  {children}
                </Select>
              </div>
              <Divider />
              <div class="task-budget">
                <h4>Budget</h4>
                <Input value={budget} style={{ width: "40%", marginRight: "5px" }} type="number" onChange={(e) => setmyBudget(e.target.value)} />
                <Button onClick={setBudgetHandler}>Set</Button>
              </div>
              <Divider />
              <div class="task-budget">
                <h4>Progress</h4>
                <Progress percent={percent} />
                <Button.Group>
                  <Button onClick={decline} icon={<MinusOutlined />} />
                  <Button onClick={increase} icon={<PlusOutlined />} />
                  <Button onClick={setProgressHandler} style={{ marginLeft: "8px" }} type="primary">
                    Set
                  </Button>
                </Button.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
