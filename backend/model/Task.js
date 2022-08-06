const con = require("../config/db");
const uuid4 = require("uuid4");
const Log = require("./Log");
const Member = require("./Member");
const User = require("./User");

class Task {
  constructor(id, sections_id, priorityId, statusId, title, description, start_date, due_date, budget, progress) {
    this.id = id;
    this.sections_id = sections_id;
    this.priorityId = priorityId;
    this.statusId = statusId;
    this.title = title;
    this.description = description;
    this.start_date = start_date;
    this.due_date = due_date;
    this.created_at = new Date();
    this.budget = budget;
    this.progress = progress;
  }
}

module.exports = {
  Task,
  // create new member by user or by admin
  create: async function (task) {
    const priorityCheck = task.priorityId === null || task.priorityId === undefined ? "0" : task.priorityId;
    const statusCheck = task.statusId === null || task.statusId === undefined ? "0" : task.statusId;
    const newTask = new Task(uuid4(), task.sectionId, priorityCheck, statusCheck, task.title, task.description, task.start_date, task.due_date, 0, 0);

    const sql = `INSERT INTO tasks (id, sections_id, priorities_id, task_status_id, title, description, start_date, due_date, created_at, budget, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newTask.id, newTask.sections_id, newTask.priorityId, newTask.statusId, newTask.title, newTask.description, newTask.start_date, newTask.due_date, newTask.created_at, newTask.budget, newTask.progress]);

    if (task.assignees === undefined || task.assignees.length < 1) {
      return newTask;
    } else {
      const arr = [];
      task.assignees.map((item) => arr.push([item, newTask.id]));
      console.log(arr);

      const sql = `INSERT INTO users_has_tasks (users_id, tasks_id) VALUES ?`;
      const [rows] = await con.promise().query(sql, [arr]);

      //const logRow = await Log.create(project_id, task.assignees, sender, "session", session.name, text, "");

      return newTask;
    }
  },

  // get all tasks
  getAllTasks: async function (id) {
    const sql = `SELECT tasks.id, tasks.sections_id, priorities.id AS priorityId, priorities.name AS priorityName, task_status.id AS statusId, task_status.name AS statusName, tasks.title, tasks.description, tasks.start_date, tasks.due_date, tasks.budget, tasks.progress, tasks.created_at 
                    FROM sections 
                    INNER JOIN tasks ON sections.id = tasks.sections_id 
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE sections.projects_id = ? ORDER BY tasks.created_at`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  getPersonalTasks: async function (project, id) {
    const sql = `SELECT tasks.id, tasks.sections_id, priorities.id AS priorityId, priorities.name AS priorityName, task_status.id AS statusId, task_status.name AS statusName, tasks.title, tasks.description, tasks.start_date, tasks.due_date, tasks.budget, tasks.progress, tasks.created_at 
                    FROM users_has_tasks 
                    INNER JOIN tasks ON users_has_tasks.tasks_id = tasks.id 
                    INNER JOIN sections ON tasks.sections_id = sections.id 
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE users_has_tasks.users_id = ? AND sections.projects_id = ? ORDER BY tasks.created_at`;

    const [rows] = await con.promise().query(sql, [id, project]);

    return rows;
  },

  getPersonalUserTasks: async function (project, id) {
    const sql = `SELECT tasks.id, tasks.sections_id, priorities.id AS priorityId, priorities.name AS priorityName, task_status.id AS statusId, task_status.name AS statusName, tasks.title, tasks.description, tasks.start_date, tasks.due_date, tasks.budget, tasks.progress, tasks.created_at 
                    FROM users_has_tasks 
                    INNER JOIN tasks ON users_has_tasks.tasks_id = tasks.id 
                    INNER JOIN sections ON tasks.sections_id = sections.id 
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE users_has_tasks.users_id = ? AND sections.projects_id = ? ORDER BY tasks.created_at`;

    const userRows = await User.getUserByProject(id, project);

    const [rows] = await con.promise().query(sql, [userRows.id, project]);

    return rows;
  },

  // get task
  getOne: async function (id) {
    const sql = `SELECT tasks.id, tasks.sections_id, priorities.id AS priorityId, priorities.name AS priorityName, task_status.id AS statusId, task_status.name AS statusName, tasks.title, tasks.description, tasks.start_date, tasks.due_date, tasks.budget, tasks.progress, tasks.created_at 
                    FROM sections 
                    INNER JOIN tasks ON sections.id = tasks.sections_id 
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE tasks.id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  getStatusGroup: async function (id) {
    const sql = `SELECT task_status.name, COUNT(tasks.id) AS total
                    FROM tasks
                    RIGHT JOIN task_status ON tasks.task_status_id = task_status.id
                    RIGHT JOIN sections ON tasks.sections_id = sections.id
                    WHERE sections.projects_id = ?
                    GROUP BY task_status.name`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  updateStatus: async function (statusId, id) {
    const sql = `UPDATE tasks SET task_status_id = ? WHERE id = ?`;
    const [rows] = await con.promise().query(sql, [statusId, id]);

    return rows;
  },

  updatePriority: async function (priorityId, id) {
    const sql = `UPDATE tasks SET priorities_id = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [priorityId, id]);

    return rows;
  },

  updateStartDate: async function (date, id) {
    const sql = `UPDATE tasks SET start_date = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [date, id]);

    return rows;
  },

  updateEndDate: async function (date, id) {
    const sql = `UPDATE tasks SET due_date = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [date, id]);

    return rows;
  },

  setBudget: async function (budget, id) {
    const sql = `UPDATE tasks SET budget = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [budget, id]);

    return rows;
  },

  setProgress: async function (progress, id) {
    const sql = `UPDATE tasks SET progress = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [progress, id]);

    return rows;
  },

  setDescription: async function (description, id) {
    const sql = `UPDATE tasks SET description = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [description, id]);

    return rows;
  },

  addAssignees: async function (assignees, task, result) {
    const arr = assignees.map((item) => "(" + item + ", " + task + ")");

    const sql = `INSERT INTO users_has_tasks (users_id, tasks_id) VALUES ` + arr;
    con.query(sql, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  addAssignee: async function (user_id, sender, task_id, project_id, result) {
    const sql = `INSERT INTO users_has_tasks (users_id, tasks_id) VALUES (?, ?)`;
    con.query(sql, [user_id, task_id], async (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      const member = await Member.findMember(user_id, project_id);
      console.log(member[0].id);

      const singleTaskRow = await this.getOne(task_id);

      const text = `assigned you a task`;

      const logRow = await Log.create(project_id, member[0].id, sender, "task", singleTaskRow[0].title, text);

      const data = { user_id: user_id, task_id: task_id };

      this.getAssingee(data, result);
    });
  },

  getAssingee: async function (body, result) {
    const sql = `SELECT tasks_id, users.id AS user_id, users.firstname, users.lastname, users.email, users.color
                  FROM users_has_tasks 
                  INNER JOIN tasks ON users_has_tasks.tasks_id = tasks.id 
                  INNER JOIN users ON users_has_tasks.users_id = users.id
                  WHERE users.id = ? AND tasks_id = ?`;

    con.query(sql, [body.user_id, body.task_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  deleteAssignee: async function (user_id, task_id) {
    const sql = `DELETE FROM users_has_tasks WHERE users_id = ? AND tasks_id = ?`;

    const [rows] = await con.promise().query(sql, [user_id, task_id]);

    return rows;
  },

  getAllAssingees: async function (id) {
    const sql = `SELECT tasks_id, users.id AS user_id, users.firstname, users.lastname, users.email, users.color
                  FROM users_has_tasks 
                  INNER JOIN tasks ON users_has_tasks.tasks_id = tasks.id 
                  INNER JOIN users ON users_has_tasks.users_id = users.id
                  INNER JOIN members ON members.users_id = users.id 
                  WHERE members.projects_id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  },

  getAssingeeTasks: async function (project, id) {
    const sql = `SELECT tasks.id AS task_id, tasks.task_status_id AS status_id, users.id AS user_id
                  FROM users_has_tasks 
                  INNER JOIN tasks ON users_has_tasks.tasks_id = tasks.id 
                  INNER JOIN users ON users_has_tasks.users_id = users.id
                  INNER JOIN members ON members.users_id = users.id 
                  WHERE members.id = ? AND members.projects_id = ?`;

    const [rows] = await con.promise().query(sql, [id, project]);

    return rows;
  },

  deleteTask: async function (id) {
    const sql = `DELETE FROM tasks WHERE id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  }
};
