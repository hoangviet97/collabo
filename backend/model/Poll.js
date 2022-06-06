const con = require("../config/db");
const uuid4 = require("uuid4");

class Poll {
  constructor(id, message_id, question) {
    this.id = id;
    this.message_id = message_id;
    this.question = question;
    this.created_at = new Date();
  }
}

module.exports = {
  Poll,
  // create new member by user or by admin
  create: async function (body, result) {
    const newPoll = new Poll(uuid4(), body.message_id, body.question);

    const sql = `INSERT INTO polls (id, messages_id, question, created_at) VALUES (?, ?, ?, ?)`;
    con.query(sql, [newPoll.id, newPoll.message_id, newPoll.question, newPoll.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newPoll);
      return;
    });
  }
};
