import React, { useState, useEffect, FC } from "react";
import { Breadcrumb, Button, Modal, Input, Select, Divider, Typography, Tag } from "antd";
import { EditOutlined, CheckOutlined, TagsOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams, Link, useLocation } from "react-router-dom";
import { createTaskTag, getTags, getTagsByTasks, deleteTaskTag } from "../../actions/tag";
import { getFilesByTask, getAllFiles } from "../../actions/file";
import { setBudget, setDescription, updateTaskPriority, updateTitle, getTask } from "../../actions/task";
import NewFileForm from "../documents/files/NewFileForm";
import FileMiniCard from "../documents/files/FileMiniCard";
import TaskDate from "../tasks/TaskDate";
import ExistingFilesModal from "./ExistingFilesModal";
import { tag, member, file } from "../../types/types";

interface Props {
  task: string;
  isVisible: boolean;
  closeModal: () => void;
  match: any;
}

const TaskDetailModal2: FC<Props> = ({ task, isVisible, closeModal, match }) => {
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
  const single_task = useSelector((state: RootStateOrAny) => state.task.task);
  const task_loading = useSelector((state: RootStateOrAny) => state.task.loading);
  const tags = useSelector((state: RootStateOrAny) => state.tag.tags);
  const alltags = useSelector((state: RootStateOrAny) => state.tag.taskTags);

  const { TextArea } = Input;

  const { Option } = Select;
  const params: any = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (single_task) {
      setTaskTitle(single_task.title);
      setmyBudget(single_task.budget);
      setTaskDescription(single_task.description);
    }
  }, [single_task]);

  useEffect(() => {
    if (params.taskId !== undefined) {
      setTagGroup(alltags);
      dispatch(getTask(params.id, task));
      dispatch(getFilesByTask({ id: task, project_id: params.id }));
      dispatch(getTagsByTasks(params.id));
      dispatch(getTags(params.id));
    }
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
  }, [tags, alltags]);

  const showTextAreaHandler = () => {
    setShowTextArea(true);
  };

  const confirmDescription = () => {
    dispatch(setDescription(task, taskDescription, params.id));
    setShowTextArea(false);
  };

  const showTitleInputHandler = () => {
    setShowTitleInput((prev) => !prev);
  };

  const setBudgetHandler = () => {
    dispatch(setBudget(task, budget, params.id));
  };

  const tagSelectorHandler = (value: any) => {
    setTagSelected(value);
  };

  const submitNewTag = () => {
    const str = tagSelected.split("/");
    dispatch(createTaskTag(params.id, task, str[0], str[1]));
    setTagGroup([...tagGroup, { id: task, projects_id: params.id, name: str[1], color: "green" }]);
    setTagSelected("");
  };

  const changeTitleHandler = () => {
    if (taskTitle !== single_task.title) {
      dispatch(updateTitle(task, taskTitle, params.id));
    }
    setShowTitleInput(false);
  };

  const deleteTagHandler = (id: string) => {
    dispatch(deleteTaskTag(params.id, id, params.taskId));
  };

  return (
    <Modal visible={isVisible} width="90%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}>
      <header className="task__detail-header">
        <div className="task__detail-bread">
          <Breadcrumb>
            <Breadcrumb.Item>{single_task ? single_task.sectionName : ""}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Link to={`/${params.id}/tasks`}>
          <Button type="primary" style={{ borderRadius: "10px" }} onClick={() => closeModal()}>
            X
          </Button>
        </Link>
      </header>
      {single_task ? (
        <>
          <div style={{ display: "flex", height: "calc(100% - 60px)" }}>
            <div className="task__detail" style={{ overflowY: "scroll", marginBottom: "30px" }}>
              <div className="task__detail-body">
                <div className="task__detail-data">
                  <div className="task__detail__meta">
                    <div className="task__detail-title">
                      {showTitleInput ? (
                        <Input value={taskTitle} onBlur={changeTitleHandler} onChange={(e: any) => setTaskTitle(e.target.value)} />
                      ) : (
                        <div className="text-ellipsis" style={{ fontSize: "32px", width: "100%" }}>
                          {taskTitle}
                        </div>
                      )}
                      {showTitleInput ? (
                        <Button onClick={changeTitleHandler} shape="round" type="dashed">
                          Done
                        </Button>
                      ) : (
                        <Button onClick={showTitleInputHandler} shape="round" type="dashed" icon={<EditOutlined />}></Button>
                      )}
                    </div>
                    <div className="task__detail-base">
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Status</span>
                        <span>{single_task.statusName}</span>
                      </div>
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Priority</span>
                        <span>{single_task.priorityName}</span>
                      </div>
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Created</span>
                        <span>{moment(single_task.created_at).format("MMM Do YY, h:mm a")}</span>
                      </div>
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Start</span>
                        <div>
                          <TaskDate id={task} date={single_task.start_date} type="start_date" />
                        </div>
                      </div>
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Due</span>
                        <TaskDate id={task} date={single_task.due_date} type="due_date" />
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
                      <div style={{ marginTop: "20px" }}>
                        {alltags
                          .filter((x: any) => x.tasks_id === task)
                          .map((item: any) => (
                            <Tag onClose={() => deleteTagHandler(item.tags_id)} closable={true}>
                              {item.name}
                            </Tag>
                          ))}
                      </div>
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
                  {files.map((item: file, index: number) => (
                    <FileMiniCard key={index} data={item} task_id={task} deleteProp={true} bordered={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Modal title="New File" width="500px" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
            <NewFileForm task={task} />
          </Modal>
        </>
      ) : (
        <h1>No task</h1>
      )}
    </Modal>
  );
};

export default TaskDetailModal2;
