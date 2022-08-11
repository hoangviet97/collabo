import React, { useState, useEffect, FC } from "react";
import { Breadcrumb, Button, Modal, Input, Select, Divider, Typography, Tag } from "antd";
import { EditOutlined, CheckOutlined, TagsOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { createTaskTag } from "../../actions/tag";
import { getFilesByTask, getAllFiles } from "../../actions/file";
import { setBudget, setDescription, updateTaskPriority, updateTaskStatus } from "../../actions/task";
import NewFileForm from "../documents/files/NewFileForm";
import FileMiniCard from "../documents/files/FileMiniCard";
import TaskDate from "../tasks/TaskDate";
import ExistingFilesModal from "./ExistingFilesModal";
import { tag, member, file } from "../../types/types";

interface Props {
  task: any;
  members: member[];
  tags: tag[];
  projectId: string;
  isVisible: boolean;
  closeModal: () => void;
}

const TaskDetailModal: FC<Props> = ({ task, members, tags, projectId, isVisible, closeModal }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [tagGroup, setTagGroup] = useState<any[]>([]);
  const [budget, setmyBudget] = useState<number>(0);
  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [tagSelected, setTagSelected] = useState<string>("");
  const [children, setChildren] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [existingFiles, setExistingFiles] = useState<boolean>(false);
  const files = useSelector((state: RootStateOrAny) => state.file.task_files);

  const { TextArea } = Input;

  const { Option } = Select;
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskTitle(task.title);
    setmyBudget(task.budget);
    setTagGroup(task.tags);
    setTaskDescription(task.description);
    dispatch(getFilesByTask({ id: task.id, project_id: projectId }));
    dispatch(getAllFiles({ project_id: projectId }));

    return () => {
      setTaskTitle("");
    };
  }, [task]);

  useEffect(() => {
    const child = [];
    for (let i = 0; i < tags.length; i++) {
      child.push(
        <Option key={`${tags[i].id}/${tags[i].name}`}>
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
    dispatch(setDescription({ id: task.id, description: taskDescription, project_id: projectId }));
    setShowTextArea(false);
  };

  const showTitleInputHandler = () => {
    setShowTitleInput((prev) => !prev);
  };

  const setBudgetHandler = () => {
    dispatch(setBudget({ id: task.id, budget: budget, project_id: projectId }));
  };

  const tagSelectorHandler = (value: any) => {
    setTagSelected(value);
  };

  const submitNewTag = () => {
    const str = tagSelected.split("/");
    dispatch(createTaskTag(projectId, task.id, str[0]));
    setTagGroup([...tagGroup, { id: task.id, projects_id: projectId, name: str[1], color: "green" }]);
    setTagSelected("");
  };

  const existingFilesModalHandler = () => {
    setExistingFiles(false);
  };

  return (
    <Modal visible={isVisible} width="90%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}>
      <header className="task__detail-header">
        <div className="task__detail-bread">
          <Breadcrumb>
            <Breadcrumb.Item>{task.section_name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button type="primary" style={{ borderRadius: "10px" }} onClick={() => closeModal()}>
          X
        </Button>
      </header>
      <div style={{ display: "flex", height: "calc(100% - 60px)" }}>
        <div className="task__detail">
          <div className="task__detail-body">
            <div className="task__detail-data">
              <div className="task__detail__meta">
                <div className="task__detail-title">
                  {showTitleInput ? (
                    <Input value={taskTitle} />
                  ) : (
                    <div className="text-ellipsis" style={{ fontSize: "32px", width: "100%" }}>
                      {taskTitle}
                    </div>
                  )}
                  <Button onClick={showTitleInputHandler} shape="round" type="dashed" icon={<EditOutlined />}></Button>
                </div>
                <div className="task__detail-base">
                  <div className="task__detail-base-item">
                    <span className="task__detail-base-title">Status</span>
                    <span>{task.statusName}</span>
                  </div>
                  <div className="task__detail-base-item">
                    <span className="task__detail-base-title">Priority</span>
                    <span>{task.priorityName}</span>
                  </div>
                  <div className="task__detail-base-item">
                    <span className="task__detail-base-title">Created</span>
                    <span>{moment(task.created_at).format("MMMM Do YYYY, h:mm a")}</span>
                  </div>
                  <div className="task__detail-base-item">
                    <span className="task__detail-base-title">Start</span>
                    <div>
                      <TaskDate id={task.id} date={task.start_date} type="start_date" />
                    </div>
                  </div>
                  <div className="task__detail-base-item">
                    <span className="task__detail-base-title">Due</span>
                    <TaskDate id={task.id} date={task.due_date} type="due_date" />
                  </div>
                </div>
                <Divider />
                <div>
                  <div className="task__detail-title">
                    <h4>Description</h4>
                    {showTextArea ? <Button onClick={confirmDescription} shape="round" type="dashed" icon={<CheckOutlined />}></Button> : <Button onClick={showTextAreaHandler} shape="round" type="dashed" icon={<EditOutlined />}></Button>}
                  </div>
                  <div>{showTextArea ? <TextArea rows={5} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} onBlur={confirmDescription} /> : <p>{taskDescription}</p>}</div>
                </div>
                <Divider />
                <div className="task-budget">
                  <div className="task__detail-title">
                    <h4>Tags</h4>
                  </div>
                  <Select allowClear style={{ width: "50%" }} onChange={tagSelectorHandler} placeholder="Please select">
                    {children}
                  </Select>
                  <Button type="primary" onClick={submitNewTag}>
                    Add
                  </Button>
                  <div style={{ marginTop: "20px" }}>{tagGroup && tagGroup.map((item) => <Tag closable={true}>{item.name}</Tag>)}</div>
                </div>
                <Divider />
                <div className="task-budget">
                  <h4>Budget</h4>
                  <Input value={budget} style={{ width: "40%", marginRight: "5px" }} type="number" onChange={(e: any) => setmyBudget(e.target.value)} />
                  <Button onClick={setBudgetHandler}>Set</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="task__right-side">
          <div className="task__attachment">
            <div className="task__detail-title">
              <h4>Attachment</h4>
              <div>
                <Button shape="round" type="dashed" onClick={() => setIsModalVisible(true)}>
                  + New File
                </Button>
              </div>
            </div>
            <div className="task__attachment-list">
              {files.map((item: file) => (
                <FileMiniCard data={item} task_id={task.id} deleteProp={true} bordered={false} />
              ))}
            </div>
          </div>
          <Divider />
        </div>
      </div>
      <Modal title="New File" width="500px" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <NewFileForm task={task.id} />
      </Modal>
      <ExistingFilesModal isVisible={existingFiles} close={existingFilesModalHandler} />
    </Modal>
  );
};

export default TaskDetailModal;
