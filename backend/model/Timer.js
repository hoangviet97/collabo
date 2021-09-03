const con = require("../config/db");
const uuid4 = require("uuid4");

class Timer {
  constructor(id, start, end, task_id, user_id, total) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.created_at = new Date();
    this.task_id = task_id;
    this.user_id = user_id;
    this.total = total;
  }
}

module.exports = {
  Timer,
  // create new member by user or by admin
  create: async function (body, user_id, result) {
    const newTimer = new Timer(uuid4(), body.start, body.end, body.task_id, user_id, body.total);

    const sql = `INSERT INTO time_records (id, start, end, created_at, tasks_id, users_id, total) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newTimer.id, newTimer.start, newTimer.end, newTimer.created_at, newTimer.task_id, newTimer.user_id, newTimer.total], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newTimer);
      return;
    });
  },

  find: async function (id, column, result) {
    let sql = "";

    if (column === "project") {
      sql = `SELECT time_records.*, tasks.title AS task_title, sections.name AS section_name FROM time_records 
                INNER JOIN tasks ON time_records.tasks_id = tasks.id 
                INNER JOIN sections ON tasks.sections_id = sections.id 
                INNER JOIN projects ON sections.projects_id = projects.id 
                WHERE projects.id = ?`;
    } else {
      sql = `SELECT time_records.*, tasks.title AS task_title, sections.name AS section_name FROM time_records 
              INNER JOIN tasks ON time_records.tasks_id = tasks.id 
              INNER JOIN sections ON tasks.sections_id = sections.id  
              WHERE users_id = ?`;
    }

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
