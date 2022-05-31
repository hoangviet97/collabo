const con = require("../config/db");
const uuid4 = require("uuid4");

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
  create: async function (body, result) {
    const priorityCheck = body.task.priorityId === null || body.task.priorityId === undefined ? "0" : body.task.priorityId;
    const statusCheck = body.task.statusId === null || body.task.statusId === undefined ? "0" : body.task.statusId;
    const newTask = new Task(uuid4(), body.task.sectionId, priorityCheck, statusCheck, body.task.title, body.task.description, body.task.start_date, body.task.due_date, 0, 0);

    const sql = `INSERT INTO tasks (id, sections_id, priorities_id, task_status_id, title, description, start_date, due_date, created_at, budget, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newTask.id, newTask.sections_id, newTask.priorityId, newTask.statusId, newTask.title, newTask.description, newTask.start_date, newTask.due_date, newTask.created_at, newTask.budget, newTask.progress], (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
        return;
      }

      if (body.task.assignees === undefined) {
        result(null, newTask);
      } else {
        const arr = [];
        body.task.assignees.map((item) => arr.push([item, newTask.id]));
        console.log(arr);

        const sql = `INSERT INTO users_has_tasks (users_id, tasks_id) VALUES ?`;
        con.query(sql, [arr], (err, res) => {
          if (err) {
            result(err, null);
            return;
          }

          result(null, newTask);
          return;
        });
      }
    });
  },

  // get all tasks
  getAllTasks: async function (id, result) {
    const sql = `SELECT tasks.id, tasks.sections_id, priorities.id AS priorityId, priorities.name AS priorityName, task_status.id AS statusId, task_status.name AS statusName, tasks.title, tasks.description, tasks.start_date, tasks.due_date, tasks.budget, tasks.progress, tasks.created_at 
                    FROM sections 
                    INNER JOIN tasks ON sections.id = tasks.sections_id 
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE sections.projects_id = ? ORDER BY tasks.created_at`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  // get all tasks
  getAllTasks2: async function (id, result) {
    const sql = `SELECT tasks.id, tasks.title, tasks.description, tasks.start_date, tasks.due_date, tasks.created_at, tasks.budget, sections.name AS section, task_status.id AS statusId, task_status.name AS status, priorities.name AS priority
                    FROM tasks
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE sections.projects_id
                    ORDER BY tasks.created_at`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  getAllTasksWithLimit: async function (id, limit, result) {
    const sql = `SELECT tasks.id, tasks.title, tasks.description, tasks.start_date, tasks.due_date, tasks.created_at, tasks.budget, sections.name AS section, task_status.id AS statusId, task_status.name AS status, priorities.name AS priority
                    FROM tasks
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE sections.projects_id = ? AND tasks.due_date IS NOT null
                    ORDER BY tasks.due_date LIMIT ${limit}
                     `;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  getStatusGroup: async function (id, result) {
    const sql = `SELECT task_status.name, COUNT(tasks.id) AS total
                    FROM tasks
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    WHERE sections.projects_id = ?
                    GROUP BY task_status.name`;
    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  updateStatus: async function (task, result) {
    const sql = `UPDATE tasks SET task_status_id = ? WHERE id = ?`;
    con.query(sql, [task.statusId, task.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  updatePriority: async function (task, result) {
    const sql = `UPDATE tasks SET priorities_id = ? WHERE id = ?`;
    con.query(sql, [task.priorityId, task.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  updateStartDate: async function (body, result) {
    const sql = `UPDATE tasks SET start_date = ? WHERE id = ?`;
    con.query(sql, [body.date, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  updateEndDate: async function (body, result) {
    const sql = `UPDATE tasks SET due_date = ? WHERE id = ?`;
    con.query(sql, [body.date, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  setBudget: async function (body, result) {
    const checkedBudget = body.budget !== null || body.budget > 0 ? body.budget : 0;

    const sql = `UPDATE tasks SET budget = ? WHERE id = ?`;
    con.query(sql, [body.budget, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  setProgress: async function (body, result) {
    const sql = `UPDATE tasks SET progress = ? WHERE id = ?`;
    con.query(sql, [body.progress, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  setDescription: async function (body, result) {
    console.log(body.id);
    const sql = `UPDATE tasks SET description = ? WHERE id = ?`;
    con.query(sql, [body.description, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
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

  addAssignee: async function (body, result) {
    const sql = `INSERT INTO users_has_tasks (users_id, tasks_id) VALUES (?, ?)`;
    con.query(sql, [body.user_id, body.task_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      const data = { user_id: body.user_id, task_id: body.task_id };

      this.getAssingee(data, result);
    });
  },

  deleteAssignee: async function (body, result) {
    const sql = `DELETE FROM users_has_tasks WHERE users_id = ? AND tasks_id = ?`;
    con.query(sql, [body.user_id, body.task_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  getAllAssingees: async function (body, result) {
    const sql = `SELECT tasks_id, users.id AS user_id, users.firstname, users.lastname, users.email 
                  FROM users_has_tasks 
                  INNER JOIN tasks ON users_has_tasks.tasks_id = tasks.id 
                  INNER JOIN users ON users_has_tasks.users_id = users.id
                  INNER JOIN members ON members.users_id = users.id 
                  WHERE members.projects_id = ?`;
    con.query(sql, [body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  getAssingeesByStatus: async function (id, status, result) {
    const sql = `SELECT tasks_id, users.id AS user_id, users.firstname, users.lastname, users.email 
                  FROM users_has_tasks 
                  INNER JOIN tasks ON users_has_tasks.tasks_id = tasks.id 
                  INNER JOIN task_status ON tasks.task_status_id = task_status.id
                  INNER JOIN users ON users_has_tasks.users_id = users.id
                  INNER JOIN members ON members.users_id = users.id 
                  WHERE members.projects_id = ? AND task_status.name IN (${statusArr})`;
    con.query(sql, [id, status], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  getAssingee: async function (body, result) {
    const sql = `SELECT tasks_id, users.id AS user_id, users.firstname, users.lastname, users.email 
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

  deleteTask: async function (id, result) {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  }
};
