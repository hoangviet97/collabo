import React, { useEffect, useState, FC, ChangeEvent } from "react";
import Container from "../../../components/utils/Container";
import { createSection, getSections, deleteSection, resetSections } from "../../../redux/actions/section";
import { getProjectTasks, createTask, getAllAssignees, resetTasks } from "../../../redux/actions/task";
import { getTagsByTasks, getTags, resetTags } from "../../../redux/actions/tag";
import { getMembers } from "../../../redux/actions/member";
import { resetProject } from "../../../redux/actions/project";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Collapse, Input, Button, Select, Divider, Skeleton } from "antd";
import { TagsOutlined, PlusOutlined, AppstoreOutlined, MenuOutlined, ExceptionOutlined } from "@ant-design/icons";
import TaskItem from "../../../components/taskItem/TaskItem";
import TaskDetailModal2 from "../../../components/modal/TaskDetailModal2";
import TaskCard from "../../../components/taskItem/TaskCard";
import { section, tag, task } from "../../../types/types";
import TaskHeader from "../../../components/taskItem/TaskHeader";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../redux/store";

interface Props {
  match: any;
}

const ProjectTasks: FC<Props> = ({ match }) => {
  const params: any = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const project_id = params.id;

  // Ant components
  const { Panel } = Collapse;
  const { Option } = Select;

  // Selectors
  const sections = useSelector((state: RootStateOrAny) => state.section.sections);
  const tasks = useSelector((state: RootStateOrAny) => state.task.tasks);
  const loading = useSelector((state: RootStateOrAny) => state.task.loading);
  const sectionLoading = useSelector((state: RootStateOrAny) => state.section.loading);
  const members = useSelector((state: RootStateOrAny) => state.member.members);
  const assignees = useSelector((state: RootStateOrAny) => state.task.assignees);
  const tags = useSelector((state: RootStateOrAny) => state.tag.taskTags);
  const allTags = useSelector((state: RootStateOrAny) => state.tag.tags);
  const user_role = useSelector((state: RootStateOrAny) => state.project.currentProject.role);

  // States
  const [taskNameForSearch, setTaskNameForSearch] = useState<string>("");
  const [showTagSelector, setShowTagSelector] = useState<boolean>(false);
  const [showStatusSelector, setShowStatusSelector] = useState<boolean>(false);
  const [taskTags, setTaskTags] = useState([]);
  const [selectedVal, setSelectedVal] = useState([]);
  const [taskContainer, setTaskContainer] = useState([]);
  const [activeCards, setActiveCards] = useState<boolean>(false);
  const [activeList, setActiveList] = useState<boolean>(true);
  const [taskVisual, setTaskVisual] = useState<string | null>("");
  const [filteredAssignees, setFilteredAssignees] = useState([]);
  const [newSectionVisibility, setNewSectionVisibility] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [newSection, setNewSection] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newTaskIndexes, setNewTaskIndexes] = useState<any>([]);

  useEffect(() => {
    if (localStorage.getItem("task_visual") === null) {
      localStorage.setItem("task_visual", "list");
    } else {
      setTaskVisual(localStorage.getItem("task_visual"));
    }
    dispatch(getSections(project_id));
    dispatch(getMembers(project_id));
    dispatch(getAllAssignees(project_id));
    dispatch(getProjectTasks(project_id));
    dispatch(getTagsByTasks(project_id));
  }, []);

  useEffect(() => {
    setTaskContainer(tasks);
  }, [tasks]);

  useEffect(() => {
    if (params.taskId !== undefined) {
      showModal();
    }
  }, [params.taskId]);

  const taskHandler = (e: any) => {
    setNewTask(e.target.value);
  };

  const sectionHandler = (e: any) => {
    setNewSection(e.target.value);
  };

  const newTaskVisibilityHandler = (index: number) => {
    setNewTaskIndexes({ [index]: true });
  };

  const sectionVisibilityHandler = () => {
    setNewSectionVisibility(true);
  };

  const onBlurTaskHandler = (sectionId: string, index: number) => {
    setNewTaskIndexes({ [index]: false });

    const values = {
      sectionId: sectionId,
      priorityId: "0",
      statusId: "0",
      title: newTask,
      description: null,
      start_date: null,
      due_date: null,
      assigneesArray: []
    };

    if (newTask.length > 0) {
      dispatch(createTask(project_id, values));
      setNewTask("");
      setSelectedVal([]);
    }
  };

  const onBlurSectionHandler = () => {
    setNewSectionVisibility(false);

    if (newSection.length === 0) {
      console.log("empty");
    } else {
      dispatch(createSection(project_id, newSection));
      setNewSection("");
    }
  };

  const deleteSectionHandler = (id: string) => {
    dispatch(deleteSection(project_id, id));
  };

  const panelHeader = (name: string, id: string) => (
    <React.Fragment>
      <div className="panel-header">
        <div className="panel-header__title">{name}</div>
        {user_role !== "Member" ? (
          <div className="panel-header__delete" onClick={() => deleteSectionHandler(id)}>
            Delete
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </React.Fragment>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = (project?: string) => {
    setIsModalVisible(false);
  };

  const showTagSelectorHandler = () => {
    setShowStatusSelector(false);
    setShowTagSelector((prev) => !prev);
  };

  const tagSelectorHandler = (val: any) => {
    setSelectedVal(val);
    const tasksIds = tags.filter((x: any) => val.includes(x.tags_id));
    const pom = tasksIds.map((x: any) => x.tasks_id);
    const newTasks = tasks.filter((item: task) => pom.includes(item.id));

    if (val.length > 0) {
      setTaskContainer(newTasks);
    } else {
      setTaskContainer(tasks);
    }
  };

  const showStatusSelectorHandler = () => {
    setShowTagSelector(false);
    setShowStatusSelector((prev) => !prev);
  };

  const StatusSelectorHandler = (value: string) => {
    const newTasks = value === "x" ? tasks : tasks.filter((x: task) => x.statusId === value);
    setTaskContainer(newTasks);
  };

  const setVisualHandler = (value: string) => {
    setTaskVisual(value);
    localStorage.setItem("task_visual", value);
  };

  return (
    <div className="project-tasks">
      {loading ? (
        <Skeleton />
      ) : (
        <Container size="50">
          <header style={{ marginRight: "20px" }}>
            <div className="task__header-options">
              <Input value={taskNameForSearch} onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskNameForSearch(e.target.value)} placeholder="Search tasks by name" data-testid="search-name" style={{ width: "40%" }} />
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>Filter by: &nbsp;</span>
                <Button onClick={showTagSelectorHandler}>
                  <TagsOutlined />
                  Tags
                </Button>
                <Button onClick={showStatusSelectorHandler}>
                  <ExceptionOutlined />
                  Status
                </Button>
                <div className="projects-dimension">
                  <Button onClick={() => setVisualHandler("card")}>
                    <AppstoreOutlined />
                  </Button>
                  <Button onClick={() => setVisualHandler("list")}>
                    <MenuOutlined />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              {showTagSelector && (
                <Select mode="multiple" value={selectedVal} allowClear style={{ width: "40%", display: "block", marginTop: "5px" }} placeholder="Select tags" onChange={tagSelectorHandler}>
                  {allTags && allTags.map((item: tag) => <Option value={item.id}>{item.name}</Option>)}
                </Select>
              )}
              {showStatusSelector && (
                <Select showSearch placeholder="Select a status" style={{ width: 200, marginTop: "5px" }} onChange={StatusSelectorHandler}>
                  <Option value="x">All</Option>
                  <Option value="0">Open</Option>
                  <Option value="1">In Progress</Option>
                  <Option value="2">On Hold</Option>
                  <Option value="3">Completed</Option>
                  <Option value="4">Cancelled</Option>
                </Select>
              )}
            </div>
          </header>
          <Divider />
          <Collapse className="task__collapse" collapsible="header" defaultActiveKey={["1"]} ghost>
            {sections.map((section: section, index: number) => (
              <Panel className="task__panel" key={section.id} header={panelHeader(section.name, section.id)}>
                {localStorage.getItem("task_visual") === "list" && <TaskHeader />}
                <div className={`task__visual-${taskVisual}`}>
                  {taskContainer
                    .filter((x: task) => {
                      return x.title.toLowerCase().includes(taskNameForSearch.toLocaleLowerCase());
                    })
                    .map((task: task, i: number) => {
                      if (section.id === task.sections_id) {
                        const assigneesArray = assignees.filter((i: any) => i.tasks_id === task.id);
                        if (taskVisual === "list") {
                          return <TaskItem showModal={showModal} closeModal={closeModal} key={i} assignees={assigneesArray} members={members} task={task} start_date={task.start_date} match={match} />;
                        } else if (taskVisual === "card") {
                          return <TaskCard key={i} task={task} sectionName={section.name} showModal={showModal} closeModal={closeModal} assignees={assigneesArray} members={members} />;
                        }
                      }
                    })}
                </div>
                <div style={{ marginTop: "15px" }}>
                  {newTaskIndexes[index] === true ? (
                    <form onSubmit={() => onBlurTaskHandler(section.id, index)}>
                      <Input onChange={(e: ChangeEvent<HTMLInputElement>) => taskHandler(e)} value={newTask} data-testid="task-input" onBlur={() => onBlurTaskHandler(section.id, index)} autoFocus />
                    </form>
                  ) : (
                    <Button type="link" data-testid="task" style={{ display: "block" }} onClick={(i) => newTaskVisibilityHandler(index)}>
                      Add task
                    </Button>
                  )}
                </div>
              </Panel>
            ))}
          </Collapse>
          {newSectionVisibility === false ? (
            <Button type="primary" style={{ borderRadius: "8px" }} data-testid="section-btn" onClick={sectionVisibilityHandler} disabled={sectionLoading}>
              <PlusOutlined />
              {sectionLoading ? "Please wait..." : "Section"}
            </Button>
          ) : (
            <div className="add-section-container">
              <div className="add-section-inputField">
                <form onSubmit={onBlurSectionHandler}>
                  <Input onBlur={onBlurSectionHandler} autoFocus value={newSection} data-testid="section-input" onChange={(e: ChangeEvent<HTMLInputElement>) => sectionHandler(e)} />
                </form>
              </div>
            </div>
          )}
          {match.params.taskId && <TaskDetailModal2 task={match.params.taskId} isVisible={isModalVisible} closeModal={closeModal} match={match} view="project" />}
        </Container>
      )}
    </div>
  );
};

export default ProjectTasks;
