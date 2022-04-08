const con = require("../config/db");
const uuid4 = require("uuid4");

class Message {
  constructor(id, project_id, member_id, text) {
    this.id = id;
    this.project = project_id;
    this.member_id = member_id;
    this.text = text;
    this.created_at = new Date();
  }
}

module.exports = {
  Message,
  // create new member by user or by admin
  create: async function (body, member, result) {
    const newMessage = new Message(uuid4(), body.project, member, body.text);
    console.log(body);
    const sql = `INSERT INTO messages (id, projects_id, members_id, text, created_at) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newMessage.id, body.project, newMessage.member_id, newMessage.text, newMessage.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newMessage);
      return;
    });
  },

  find: async function (id, result) {
    const sql = `SELECT messages.id, messages.text, messages.created_at, users.firstname, users.lastname 
                    FROM messages 
                    INNER JOIN members ON messages.members_id = members.id
                    INNER JOIN users ON members.users_id = users.id
                    WHERE messages.projects_id = ?
                    ORDER BY created_at desc`;

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
