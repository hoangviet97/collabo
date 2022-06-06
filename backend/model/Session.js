const con = require("../config/db");
const uuid4 = require("uuid4");

class Session {
  constructor(id, projectId, name, date, start, end, description, place) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.date = date;
    this.start = start;
    this.end = end;
    this.description = description;
    this.created_at = new Date();
    this.place = place;
  }
}

module.exports = {
  Session,
  // create new member by user or by admin
  create: async function (session, project, result) {
    const newSession = new Session(uuid4(), project, session.name, session.date, session.start, session.end, session.description, session.place);

    const sql = `INSERT INTO sessions (id, projects_id, name, date, start, end, description, created_at, place) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newSession.id, newSession.projectId, newSession.name, newSession.date, newSession.start, newSession.end, newSession.description, newSession.created_at, newSession.place], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (session.participants === undefined) {
        result(null, newSession);
      } else {
        const arr = [];
        session.participants.map((item) => arr.push([item, newSession.id]));

        const sql = `INSERT INTO members_has_sessions (members_id, sessions_id) VALUES ?`;
        con.query(sql, [arr], (err, res) => {
          if (err) {
            result(err, null);
            return;
          }

          result(null, newSession);
          return;
        });
      }
    });
  },

  find: async function (projectId, result) {
    const currDate = new Date();
    const sql = `SELECT * FROM sessions WHERE projects_id = ?`;

    con.query(sql, [projectId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  findOne: async function (id, result) {
    const sql = `SELECT * FROM sessions WHERE id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  delete: async function (id, result) {
    const sql = `DELETE FROM sessions WHERE id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  findParticipants: async function (id, result) {
    const sql = `SELECT users.firstname, users.lastname, users.email
                  FROM members_has_sessions 
                  INNER JOIN members ON members_has_sessions.members_id = members.id
                  INNER JOIN users ON members.users_id = users.id
                  WHERE members_has_sessions.sessions_id = ?`;

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
