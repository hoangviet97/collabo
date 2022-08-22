import React, { useState, useEffect, FC } from "react";
import { Breadcrumb, Button, Modal, Input, Select, Divider, Tag } from "antd";
import { EditOutlined, CheckOutlined, TagsOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { createTaskTag, getTags, getTagsByTasks, deleteTaskTag } from "../../actions/tag";
import { getFilesByTask } from "../../actions/file";
import { setBudget, setDescription, updateTaskPriority, updateTaskStatus, getTaskAssignees, updateTitle, getTask } from "../../actions/task";
import NewFileForm from "../documents/files/NewFileForm";
import FileMiniCard from "../documents/files/FileMiniCard";
import TaskDate from "../tasks/TaskDate";
import { tag, member, file } from "../../types/types";
import AssigneesBox from "../assignees/AssigneesBox";

interface Props {
  task: string;
  isVisible: boolean;
  closeModal: (project?: string) => void;
  match: any;
  view: string;
  project?: string;
}

const TaskDetailModal2: FC<Props> = ({ task, isVisible, closeModal, match, view, project }) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [tagGroup, setTagGroup] = useState<any[]>([]);
  const [budget, setmyBudget] = useState<number>(0);
  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [tagSelected, setTagSelected] = useState<string>("");
  const [children, setChildren] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);
  const files = useSelector((state: RootStateOrAny) => state.file.task_files);
  const single_task = useSelector((state: RootStateOrAny) => state.task.task);
  const task_loading = useSelector((state: RootStateOrAny) => state.task.loading);
  const tags = useSelector((state: RootStateOrAny) => state.tag.tags);
  const alltags = useSelector((state: RootStateOrAny) => state.tag.taskTags);
  const assignees = useSelector((state: RootStateOrAny) => state.task.single_assignees);

  const { TextArea } = Input;

  const { Option } = Select;
  const history = useHistory();
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
      dispatch(getTaskAssignees(params.id, params.taskId));
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

  const switchTaskPriorityHandler = (value: string) => {
    dispatch(updateTaskPriority(task, value, params.id));
  };

  const switchTaskStatusHandler = (value: string) => {
    dispatch(updateTaskStatus(task, value, params.id));
  };

  const closeModalHandler = () => {
    const url = view === "project" ? `/${params.id}/tasks` : `/my-tasks`;
    history.push(url);
    closeModal(project);
  };

  return (
    <Modal visible={isVisible} width="90%" centered closable={false} footer={false} bodyStyle={{ height: "90vh", padding: "0" }}>
      <header className="task__detail-header">
        <div className="task__detail-bread">
          <Breadcrumb>
            <Breadcrumb.Item>{single_task ? single_task.sectionName : ""}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Button type="primary" style={{ borderRadius: "10px" }} onClick={closeModalHandler}>
          X
        </Button>
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
                        <Button onClick={showTitleInputHandler} disabled={user_role === "Member" ? true : false} shape="round" type="dashed" icon={<EditOutlined />}></Button>
                      )}
                    </div>
                    <div className="task__detail-base">
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Status</span>
                        <Select value={single_task.priorityId} onChange={switchTaskPriorityHandler} disabled={user_role === "Member" || single_task.statusId === "5" ? true : false} style={{ width: 120, marginLeft: "-12px" }} showArrow={false} bordered={false}>
                          <Option value="0">Low</Option>
                          <Option value="1">Medium</Option>
                          <Option value="2">High</Option>
                        </Select>
                      </div>
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Due</span>
                        {single_task.statusId === "5" ? (
                          <div>Under Review</div>
                        ) : (
                          <Select className="task-select" value={single_task.statusId} disabled={user_role === "Member" || single_task.statusId === "5" ? true : false} onChange={switchTaskStatusHandler} showArrow={false} style={{ width: "100%", marginLeft: "-12px" }} bordered={false}>
                            <Option value="0">Open</Option>
                            <Option value="1">In Progress</Option>
                            <Option value="2">On Hold</Option>
                            <Option value="3">Completed</Option>
                            <Option value="4">Canceled</Option>
                          </Select>
                        )}
                      </div>
                      <div className="task__detail-base-item">
                        <span className="task__detail-base-title">Created</span>
                        <span>{moment(single_task.created_at).format("MMM Do YY")}</span>
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
                      <div className="task__detail-base-item">
                        <AssigneesBox assignees={assignees} id={params.taskId} type="task" />
                      </div>
                    </div>
                    <Divider />
                    <div>
                      <div className="task__detail-title">
                        <h4>Description</h4>
                        {showTextArea ? <Button onClick={confirmDescription} disabled={user_role === "Member" ? true : false} shape="round" type="dashed" icon={<CheckOutlined />}></Button> : <Button onClick={showTextAreaHandler} shape="round" type="dashed" icon={<EditOutlined />}></Button>}
                      </div>
                      <div>{showTextArea ? <TextArea rows={5} value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} onBlur={confirmDescription} /> : <p>{taskDescription}</p>}</div>
                    </div>
                    <Divider />
                    <div className="task-budget">
                      <div className="task__detail-title">
                        <h4>Tags</h4>
                      </div>
                      <Select allowClear disabled={user_role === "Member" ? true : false} style={{ width: "50%" }} onChange={tagSelectorHandler} placeholder="Please select">
                        {children}
                      </Select>
                      <Button type="primary" disabled={user_role === "Member" ? true : false} onClick={submitNewTag}>
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
                      <Input value={budget} disabled={user_role === "Member" ? true : false} style={{ width: "40%", marginRight: "5px" }} type="number" onChange={(e: any) => setmyBudget(e.target.value)} />
                      <Button disabled={user_role === "Member" ? true : false} onClick={setBudgetHandler}>
                        Set
                      </Button>
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
