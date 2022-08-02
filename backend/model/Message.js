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

class Reply {
  constructor(id, message, member, text, created_at) {
    this.id = id;
    this.message = message;
    this.member = member;
    this.text = text;
    this.created_at = created_at;
  }
}

module.exports = {
  Message,
  Poll,
  PollOption,
  Reply,
  // create new member by user or by admin
  create: async function (body, project, member, result) {
    const newMessage = new Message(uuid4(), project, member, body.text);
    const sql = `INSERT INTO messages (id, projects_id, members_id, text, created_at) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newMessage.id, project, newMessage.member_id, newMessage.text, newMessage.created_at], (err, MesRes) => {
      if (err) {
        result(err, null);
        return;
      }

      if (body.question.length === 1) {
        result(null, newMessage);
        return;
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

  create2: async function (body, project, member) {
    const newMessage = new Message(uuid4(), project, member, body.text);
    const sql = `INSERT INTO messages (id, projects_id, members_id, text, created_at) VALUES (?, ?, ?, ?, ?)`;
  },

  find: async function (id, result) {
    const sql = `SELECT messages.id, messages.text, messages.created_at, users.firstname, users.lastname, users.color
                    FROM messages 
                    INNER JOIN members ON messages.members_id = members.id
                    INNER JOIN users ON members.users_id = users.id
                    WHERE messages.projects_id = ?
                    ORDER BY created_at desc`;

    con.query(sql, [id], (err, mesRes) => {
      if (err) {
        result(err, null);
        return;
      }

      const pollSql = `SELECT polls.* FROM polls
                        INNER JOIN messages ON polls.messages_id = messages.id
                        WHERE messages.projects_id = ?`;

      con.query(pollSql, [id], (err, pollRes) => {
        if (err) {
          result(err, null);
          return;
        }

        const optionSql = `SELECT poll_options.* FROM poll_options
                            INNER JOIN polls ON poll_options.polls_id = polls.id
                            INNER JOIN messages ON polls.messages_id = messages.id
                            WHERE messages.projects_id = ?`;

        con.query(optionSql, [id], (err, optionRes) => {
          if (err) {
            result(err, null);
            return;
          }

          const voteSql = `SELECT poll_options.id AS option_id, members.id AS member_id, polls.id AS poll_id, users.firstname, users.lastname, users.email, users.color FROM members_has_poll_options
                            INNER JOIN members ON members_has_poll_options.members_id = members.id
                            INNER JOIN poll_options ON members_has_poll_options.poll_options_id = poll_options.id
                            INNER JOIN polls ON poll_options.polls_id = polls.id
                            INNER JOIN users ON members.users_id = users.id
                            WHERE members.projects_id = ?`;

          con.query(voteSql, [id], (err, voteRes) => {
            const pollOptionMerge = pollRes.map((pollitem) => {
              const helper = optionRes.filter((i) => i.polls_id === pollitem.id);
              return { ...pollitem, optionArray: helper };
            });

            const messagePollMerger = mesRes.map((mesItem) => {
              const pollData = pollOptionMerge.find((x) => x.messages_id === mesItem.id);
              return { ...mesItem, pollData: pollData ? pollData : [] };
            });

            result(null, { messages: messagePollMerger, votes: voteRes });
            return;
          });
        });
      });
    });
  },

  addVote: async function (option_id, member, result) {
    const sql = `INSERT INTO members_has_poll_options (members_id, poll_options_id) VALUES (?, ?)`;
    con.query(sql, [member, option_id], (err, res) => {
      const resData = { member_id: member, option_id: option_id };
      result(null, resData);
    });
  },

  deleteVote: async function (option_id, member, result) {
    const sql = `DELETE FROM members_has_poll_options WHERE members_id = ? AND poll_options_id = ?`;
    con.query(sql, [member, option_id], (err, res) => {
      const deletedItem = { member_id: member, option_id: option_id };
      result(null, deletedItem);
    });
  },

  sendReply: async function (body, member, result) {
    const newReply = new Reply(uuid4(), body.message, member, body.text, new Date());
    const sql = `INSERT INTO message_replies (id, messages_id, members_id, text, created_at) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newReply.id, newReply.message, newReply.member, newReply.text, newReply.created_at], (err, res) => {
      result(null, newReply);
    });
  },

  getAll: async function (project, result) {
    const sql = `SELECT message_replies.*, users.firstname, users.lastname, users.color
                    FROM message_replies 
                    INNER JOIN members ON message_replies.members_id = members.id 
                    INNER JOIN users ON members.users_id = users.id
                    WHERE members.projects_id = ?`;
    con.query(sql, [project], (err, res) => {
      result(null, res);
    });
  }
};
