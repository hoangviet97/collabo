const con = require("../config/db");
const uuid4 = require("uuid4");

class TalkingPoint {
  constructor(id, session_id, text) {
    this.id = id;
    this.session_id = session_id;
    this.text = text;
    this.created_at = new Date();
  }
}

module.exports = {
  TalkingPoint,
  // create new member by user or by admin
  create: async function (body, result) {
    const newTalkingPoint = new TalkingPoint(uuid4(), body.session_id, body.text);

    const sql = `INSERT INTO talking_points (id, sessions_id, text, created_at) VALUES (?, ?, ?, ?)`;
    con.query(sql, [newTalkingPoint.id, newTalkingPoint.session_id, newTalkingPoint.text, newTalkingPoint.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newTalkingPoint);
      return;
    });
  },

  find: async function (session_id, result) {
    const sql = `SELECT * FROM talking_points WHERE sessions_id = ?`;

    con.query(sql, [session_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
