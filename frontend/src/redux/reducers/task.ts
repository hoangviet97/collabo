import { CREATE_TASK, FILTER_STATUS, FILTER_PRIORITY, GET_TASK_ASSIGNEES, GET_STATUS_GROUP, GET_TASK, CREATE_TASK_FAIL, SET_BUDGET, SET_PROGRESS, GET_ASSIGNEES, GET_ASSIGNEES_FAIL, GET_PROJECT_TASKS, UPDATE_TASK_TITLE, GET_PROJECT_TASKS_FAIL, DELETE_TASK, DELETE_TASK_FAIL, TASKS_LOADING, UPDATE_TASK_STATUS, UPDATE_TASK_PRIORITY, RESET_TASKS, UPDATE_TASK_START, UPDATE_TASK_FAIL, UPDATE_TASK_END, UPDATE_TASK_END_FAIL, CREATE_ASSIGNEE, DELETE_ASSIGNEE, GET_EXPENSES, GET_ASSIGNEE_TASKS } from "../actions/types";
import moment from "moment";
import { task } from "../../types/types";

const initialState = {
  tasks: [],
  task: {},
  member_tasks: [],
  filtered: [],
  expenses: [],
  assignees: [],
  single_assignees: [],
  statusGroup: [],
  loading: false
};

function taskReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload]
      };
    case CREATE_TASK_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_TASK:
      return {
        ...state,
        loading: false,
        task: payload
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_ASSIGNEES:
      return {
        ...state,
        assignees: payload
      };
    case GET_TASK_ASSIGNEES:
      return {
        ...state,
        single_assignees: payload.data.filter((item: any) => item.tasks_id === payload.task)
      };
    case GET_ASSIGNEE_TASKS:
      return {
        ...state,
        member_tasks: payload
      };
    case GET_STATUS_GROUP:
      let group: any = [
        { name: "Open", total: 0 },
        { name: "On Hold", total: 0 },
        { name: "Completed", total: 0 },
        { name: "In Progress", total: 0 },
        { name: "Canceled", total: 0 },
        { name: "Under Review", total: 0 }
      ];

      for (let i = 0; i < payload.length; i++) {
        group.find((x: any) => x.name === payload[i].statusName).total += 1;
      }

      return {
        ...state,
        statusGroup: group
      };
    case GET_ASSIGNEES_FAIL:
      return {
        ...state
      };
    case CREATE_ASSIGNEE:
      return {
        ...state,
        assignees: [...state.assignees, payload],
        single_assignees: [...state.single_assignees, payload]
      };
    case DELETE_ASSIGNEE:
      const deletedItem = state.assignees.find((item: any) => {
        return item.user_id === payload.user_id && item.tasks_id === payload.task_id;
      });

      const deletedItem2 = state.single_assignees.find((item: any) => {
        return item.user_id === payload.user_id && item.tasks_id === payload.task_id;
      });

      return {
        ...state,
        assignees: state.assignees.filter((item: any) => item !== deletedItem),
        single_assignees: state.single_assignees.filter((item: any) => item !== deletedItem2)
      };
    case GET_PROJECT_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false
      };
    case GET_PROJECT_TASKS_FAIL:
      return {
        ...state,
        tasks: [],
        loading: false
      };
    case UPDATE_TASK_TITLE:
      return {
        ...state,
        tasks: state.tasks.map((item: task) => (item.id === payload.id ? { ...item, title: payload.title } : item))
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((item: task) => (item.id === payload.id ? { ...item, statusId: payload.statusId } : item)),
        task: { ...state.task, statusId: payload.statusId }
      };
    case SET_BUDGET:
      return {
        ...state,
        tasks: state.tasks.map((item: task) => (item.id === payload.id ? { ...item, budget: payload.budget } : item))
      };
    case SET_PROGRESS:
      return {
        ...state,
        tasks: state.tasks.map((item: task) => (item.id === payload.id ? { ...item, progress: payload.progress } : item))
      };
    case UPDATE_TASK_PRIORITY:
      return {
        ...state,
        tasks: state.tasks.map((item: task) => (item.id === payload.id ? { ...item, priorityId: payload.priorityId } : item)),
        task: { ...state.task, priorityId: payload.priorityId }
      };
    case UPDATE_TASK_START:
      const singleStart = Object.keys(state.task).length === 0 ? {} : { ...state.task, start_date: payload.date };

      return {
        ...state,
        tasks: state.tasks.map((item: task) => (item.id === payload.id ? { ...item, start_date: payload.date } : item)),
        task: singleStart
      };
    case UPDATE_TASK_END:
      const singleDue = Object.keys(state.task).length === 0 ? {} : { ...state.task, due_date: payload.date };

      return {
        ...state,
        tasks: state.tasks.map((item: task) => (item.id === payload.id ? { ...item, due_date: payload.date } : item)),
        task: singleDue
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item: task) => item.id !== payload)
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        loading: false
      };
    case RESET_TASKS:
      return {
        ...state,
        tasks: [],
        member_tasks: [],
        filtered: [],
        assignees: []
      };
    case GET_EXPENSES:
      return {
        ...state,
        tasks: payload,
        expenses: payload.filter((item: task) => item.budget > 0)
      };
    case FILTER_STATUS:
      return {
        ...state,
        tasks: state.tasks.filter((item: task) => item.statusId === payload)
      };
    case FILTER_PRIORITY:
      return {
        ...state,
        filtered: state.tasks.filter((item: task) => item.priorityId === payload)
      };
    default:
      return state;
  }
}

export default taskReducer;
