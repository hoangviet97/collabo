const con = require("../config/db");
const uuid4 = require("uuid4");

class Timer {
  constructor(id, task_id, member_id, start, end, total, description) {
    this.id = id;
    this.task_id = task_id;
    this.member_id = member_id;
    this.start = start;
    this.end = end;
    this.created_at = new Date();
    this.total = total;
    this.description = description;
  }
}

module.exports = {
  Timer,
  // create new member by user or by admin
  create: async function (body, member, result) {
    const newTimer = new Timer(uuid4(), body.task_id, member, body.start, body.end, body.total, body.description);

    const sql = `INSERT INTO time_records (id, tasks_id, members_id, start, end, created_at, total) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newTimer.id, newTimer.task_id, newTimer.member_id, newTimer.start, newTimer.end, newTimer.created_at, newTimer.total], (err, res) => {
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

    sql = `SELECT time_records.*, tasks.title AS task_title, sections.name AS section_name FROM time_records 
              INNER JOIN tasks ON time_records.tasks_id = tasks.id 
              INNER JOIN sections ON tasks.sections_id = sections.id  
              WHERE time_records.members_id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      console.log(res);
      result(null, res);
      return;
    });
  },

  getSum: async function (id, result) {
    let sql = "";

    sql = `SELECT SUM(time_records.total) AS sum
              FROM time_records
              INNER JOIN members ON time_records.members_id = members.id  
              WHERE members.projects_id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      console.log(res[0].sum);
      result(null, res[0].sum);
      return;
    });
  },

  findByProject: async function (id, result) {
    let sql = `SELECT * FROM time_records 
              INNER JOIN members ON time_records.members_id = members.id
              WHERE members.projects_id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      console.log(res);
      result(null, res);
      return;
    });
  }
};
