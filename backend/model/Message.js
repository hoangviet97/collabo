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

class Poll {
  constructor(id, message_id, question) {
    this.id = id;
    this.message_id = message_id;
    this.question = question;
    this.created_at = new Date();
  }
}

class PollOption {
  constructor(id, poll_id, text, total) {
    this.id = id;
    this.poll_id = poll_id;
    this.text = text;
    this.total = total;
  }
}

module.exports = {
  Message,
  Poll,
  PollOption,
  // create new member by user or by admin
  create: async function (body, member, result) {
    console.log(body);
    const newMessage = new Message(uuid4(), body.project, member, body.text);
    const sql = `INSERT INTO messages (id, projects_id, members_id, text, created_at) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newMessage.id, body.project, newMessage.member_id, newMessage.text, newMessage.created_at], (err, MesRes) => {
      if (err) {
        result(err, null);
        return;
      }

      if (body.question === null || body.question === undefined || body.question.length < 1) {
        result(null, newMessage);
      } else {
        const newPoll = new Poll(uuid4(), newMessage.id, body.question);
        const pollSql = `INSERT INTO polls (id, messages_id, question, created_at) VALUES (?, ?, ?, ?)`;
        con.query(pollSql, [newPoll.id, newPoll.message_id, newPoll.question, newPoll.created_at], (err, pollRes) => {
          if (err) {
            result(err, null);
            return;
          }

          const arr = [];
          body.options.map((item) => arr.push([uuid4(), newPoll.id, item, 0]));
          const optionSql = `INSERT INTO poll_options (id, polls_id, text, total) VALUES ?`;
          con.query(optionSql, [arr], (err, optionRes) => {
            const clearedOptions = [];

            for (let i = 0; i < arr.length; i++) {
              clearedOptions.push({ id: arr[i][0], poll_id: arr[i][1], text: arr[i][2], total: arr[i][3] });
            }

            const fullRes = { msg: newMessage, poll: newPoll, options: clearedOptions };
            result(null, fullRes);
            return;
          });
        });
      }
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
