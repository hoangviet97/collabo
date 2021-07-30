const con = require("../config/db");
const uuid4 = require("uuid4");

class Session {
  constructor(id, projectId, name, date, start, end, description) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.date = date;
    this.start = start;
    this.end = end;
    this.description = description;
    this.created_at = new Date();
  }
}

module.exports = {
  Session,
  // create new member by user or by admin
  create: async function (body, result) {
    const newSession = new Session(uuid4(), body.session.project_id, body.session.name, body.session.date, body.session.start, body.session.end, body.session.description);

    const sql = `INSERT INTO sessions (id, projects_id, name, date, start, end, description, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newSession.id, newSession.projectId, newSession.name, newSession.date, newSession.start, newSession.end, newSession.description, newSession.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newSession);
      return;
    });
  },

  find: async function (projectId, result) {
    const sql = `SELECT * FROM sessions WHERE projects_id = ?`;

    con.query(sql, [projectId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
