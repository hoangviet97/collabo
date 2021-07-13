const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  // create new member by user or by admin
  createTask: async function (body, result) {
    const newTask = {
      id: uuid4(),
      sectionId: body.sectionId,
      priorityId: body.priorityId == null || body.priorityId == undefined ? 0 : body.priorityId,
      statusId: body.statusId == null || body.priorityId == undefined ? 0 : body.statusId,
      name: body.name,
      description: body.description,
      start_date: body.start_date,
      due_date: body.due_date,
      created_at: new Date(),
      assigneesArray: body.assigneesArray
    };

    const sql = `INSERT INTO tasks (id, sections_id, priorities_id, task_status_id, name, description, start_date, due_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newTask.id, newTask.sectionId, newTask.priorityId, newTask.statusId, newTask.name, newTask.description, newTask.start_date, newTask.due_date, newTask.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (newTask.assigneesArray.length > 0) {
        result(null, { assignees: newTask.assigneesArray, task: newTask.id });
        return;
      } else {
        result(null, null);
        return;
      }
    });
  },

  createTaskAssignees: async function (body, result) {
    const arr = [];
    const { assignees, task } = body;
    assignees.map((assignee) => arr.push([assignee, task]));

    const sql = `INSERT INTO members_tasks (members_id, tasks_id) VALUES ?`;
    con.query(sql, [arr], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  // get all tasks
  getAllTasks: async function (id, result) {
    const sql = `SELECT tasks.id, tasks.sections_id, priorities.id AS priorityId, task_status.id AS statusId, tasks.name, tasks.description, tasks.start_date, tasks.due_date, tasks.created_at 
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
  getPersonalTasks: async function (id, userId, result) {
    const sql = `SELECT tasks.id, tasks.sections_id, priorities.id AS priorityId, task_status.id AS statusId, tasks.name, tasks.description, tasks.start_date, tasks.due_date, tasks.created_at 
                    FROM members_tasks 
                    INNER JOIN tasks ON members_tasks.tasks_id = tasks.id 
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    WHERE sections.projects_id = ? AND members_tasks.members_id = (SELECT id FROM members WHERE users_id = ? AND projects_id = ?)`;

    con.query(sql, [id, userId, id], (err, res) => {
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

  getAllAssingees: async function (body, result) {
    const sql = `SELECT tasks_id, users.id AS user_id, users.firstname, users.lastname, users.email 
                  FROM members_tasks 
                  INNER JOIN members ON members_tasks.members_id = members.id 
                  INNER JOIN tasks ON members_tasks.tasks_id = tasks.id 
                  INNER JOIN users ON members.users_id = users.id
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
