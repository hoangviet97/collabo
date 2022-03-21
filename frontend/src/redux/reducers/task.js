import { CREATE_TASK, GET_STATUS_GROUP, CREATE_TASK_FAIL, SET_BUDGET, SET_PROGRESS, GET_ASSIGNEES, GET_ASSIGNEES_FAIL, GET_PROJECT_TASKS, GET_PROJECT_TASKS_FAIL, DELETE_TASK, DELETE_TASK_FAIL, TASKS_LOADING, UPDATE_TASK_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_FAIL, UPDATE_TASK_START, UPDATE_TASK_START_FAIL, UPDATE_TASK_END, UPDATE_TASK_END_FAIL, CREATE_ASSIGNEE, DELETE_ASSIGNEE } from "../../actions/types";

const initialState = {
  tasks: [],
  assignees: [],
  statusGroup: [],
  loading: false
};

function taskReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload]
      };
    case CREATE_TASK_FAIL:
      return {
        ...state
      };
    case GET_ASSIGNEES:
      return {
        ...state,
        assignees: payload
      };
    case GET_STATUS_GROUP:
      return {
        ...state,
        statusGroup: payload
      };
    case GET_ASSIGNEES_FAIL:
      return {
        ...state
      };
    case CREATE_ASSIGNEE:
      return {
        ...state,
        assignees: [...state.assignees, payload]
      };
    case DELETE_ASSIGNEE:
      const deletedItem = state.assignees.find((item) => {
        return item.user_id === payload.user_id && item.tasks_id === payload.task_id;
      });

      return {
        ...state,
        assignees: state.assignees.filter((item) => item !== deletedItem)
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
        tasks: []
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, task_status_id: payload.statusId } : item))
      };
    case SET_BUDGET:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, budget: payload.budget } : item))
      };
    case SET_PROGRESS:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, progress: payload.progress } : item))
      };
    case UPDATE_TASK_PRIORITY:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, priorityId: payload.priorityId } : item))
      };
    case UPDATE_TASK_START:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, start_date: payload.date } : item))
      };
    case UPDATE_TASK_END:
      return {
        ...state,
        tasks: state.tasks.map((item) => (item.id === payload.id ? { ...item, due_date: payload.date } : item))
      };
    case UPDATE_TASK_FAIL:
      return {
        ...state
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== payload)
      };
    case DELETE_TASK_FAIL:
      return {
        ...state
      };
    case TASKS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

export default taskReducer;
