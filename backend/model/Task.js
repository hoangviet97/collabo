const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  // create new member by user or by admin
  createTask: async function (body, result) {
    const newTask = {
      id: uuid4(),
      sectionId: body.sectionId,
      priorityId: body.priorityId,
      statusId: body.statusId,
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
    const sql = `SELECT tasks.sections_id, priorities.name AS priority, task_status.name AS status, tasks.name, tasks.description, tasks.start_date, tasks.due_date, tasks.created_at 
                    FROM sections 
                    INNER JOIN tasks ON sections.id = tasks.sections_id 
                    INNER JOIN task_status ON tasks.task_status_id = task_status.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    WHERE sections.projects_id = ?`;

    con.query(sql, [id], (err, res) => {
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
