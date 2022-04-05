import { createSelector } from "reselect";

const tasks = (state) => state.task.tasks;

export const alltasks = createSelector([tasks, (tasks, status) => status], (items, status) => items.filter((item) => item.statusId === status));
