const con = require("../config/db");
const uuid4 = require("uuid4");
const Log = require("./Log");

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
  create: async function (session, project_id, sender) {
    const newSession = new Session(uuid4(), project_id, session.name, session.date, session.start, session.end, session.description, session.place);
    const sql = `INSERT INTO sessions (id, projects_id, name, date, start, end, description, created_at, place) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newSession.id, newSession.projectId, newSession.name, newSession.date, newSession.start, newSession.end, newSession.description, newSession.created_at, newSession.place]);

    if (session.participants === undefined || session.participants.length < 1) {
      return newSession;
    } else {
      const arr = [];
      session.participants.map((item) => arr.push([item, newSession.id]));

      const sql2 = "INSERT INTO members_has_sessions (members_id, sessions_id) VALUES ?";
      const res = await con.promise().query(sql2, [arr]);

      const text = `invites you to a session`;

      const logRow = await Log.create(project_id, session.participants, sender, "session", session.name, text, "");

      return newSession;
    }
  },

  find: async function (projectId) {
    const sql = `SELECT * FROM sessions WHERE projects_id = ? ORDER BY date asc`;

    const [rows] = await con.promise().query(sql, projectId);

    return rows;
  },

  findOne: async function (id) {
    const sql = `SELECT * FROM sessions WHERE id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  },

  delete: async function (id) {
    const sql = `DELETE FROM sessions WHERE id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  },

  findParticipants: async function (id) {
    const sql = `SELECT users.firstname, users.lastname, users.email, users.color
                  FROM members_has_sessions 
                  INNER JOIN members ON members_has_sessions.members_id = members.id
                  INNER JOIN users ON members.users_id = users.id
                  WHERE members_has_sessions.sessions_id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  }
};
