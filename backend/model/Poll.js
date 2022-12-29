const con = require("../config/db");
const uuid4 = require("uuid4");
const Member = require("./Member");
const User = require("./User");

class Poll {
  constructor(id, message_id, question) {
    this.id = id;
    this.message_id = message_id;
    this.question = question;
    this.created_at = new Date();
  }
}

module.exports = {
  // Invitation class
  Poll,

  create: async function (message_id) {
    const sql = `INSERT INTO invitations (id, sender, receiver, created_at, projects_id, seen) VALUES (?, ?, ?, ?, ?, ?)`;
    const invitation = new Invitation(uuid4(), sender, user, project);
    const [rows] = await con.promise().query(sql, [invitation.id, invitation.sender, invitation.receiver, invitation.created_at, invitation.project, invitation.seen]);

    return invitation;
  },

  delete: async function (id) {
    const sql = `DELETE from invitations WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  }
};
