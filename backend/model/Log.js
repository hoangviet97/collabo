const con = require("../config/db");
const uuid4 = require("uuid4");

class Log {
  constructor(id, project_id, member_id, sender, type, title, text, comment) {
    this.id = id;
    this.project_id = project_id;
    this.member_id = member_id;
    this.sender = sender;
    this.type = type;
    this.title = title;
    this.text = text;
    this.created_at = new Date();
    this.seen = "F";
    this.comment = comment;
  }
}

module.exports = {
  // Invitation class
  Log,

  create: async function (project_id, member_id, sender, type, title, text, comment) {
    if (Array.isArray(member_id)) {
      const new_date = new Date();
      const memberArr2 = [];
      const memberArr = member_id.map((member) => "(" + uuid4() + ", " + project_id + ", " + member + ", " + sender + ", " + type + ", " + title + ", " + text + ", " + new_date + ", " + "F" + ", " + comment + ")");
      member_id.map((member) => memberArr2.push([uuid4(), project_id, member, sender, type, title, text, new Date(), "F", comment]));

      console.log(memberArr);

      const memberSql = `INSERT INTO logs (id, projects_id, members_id, sender, type, title, text, created_at, seen, comment) VALUES ?`;
      const res = await con.promise().query(memberSql, [memberArr2]);
    } else {
      const sql = `INSERT INTO logs (id, projects_id, members_id, sender, type, title, text, created_at, seen, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const newLog = new Log(uuid4(), project_id, member_id, sender, type, title, text, comment);
      const [rows] = await con.promise().query(sql, [newLog.id, newLog.project_id, newLog.member_id, newLog.sender, newLog.type, newLog.title, newLog.text, newLog.created_at, newLog.seen, newLog.comment]);
    }

    return project_id;
  },

  // Get all user's invitations
  findAll: async function (member) {
    const sql = `SELECT logs.*, users.firstname, users.lastname, users.email, users.color  FROM logs
                  INNER JOIN members ON logs.sender = members.id
                  INNER JOIN users ON members.users_id = users.id
                   WHERE members_id = ? ORDER BY logs.created_at DESC`;

    const [rows] = await con.promise().query(sql, [member]);

    return rows;
  }
};
