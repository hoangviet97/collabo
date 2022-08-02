const con = require("../config/db");
const uuid4 = require("uuid4");

class TalkingPoint {
  constructor(id, session_id, text) {
    this.id = id;
    this.session_id = session_id;
    this.text = text;
    this.created_at = new Date();
    this.checked = false;
  }
}

module.exports = {
  TalkingPoint,
  // create new member by user or by admin
  create: async function (text, id) {
    const newTalkingPoint = new TalkingPoint(uuid4(), id, text);

    const sql = `INSERT INTO talking_points (id, sessions_id, text, created_at, checked) VALUES (?, ?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newTalkingPoint.id, newTalkingPoint.session_id, newTalkingPoint.text, newTalkingPoint.created_at, newTalkingPoint.checked]);

    return newTalkingPoint;
  },

  find: async function (session_id) {
    const sql = `SELECT * FROM talking_points WHERE sessions_id = ?`;

    const [rows] = await con.promise().query(sql, session_id);

    return rows;
  },

  updateCheck: async function (val, id) {
    const sql = `UPDATE talking_points SET checked = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [val, id]);

    return rows;
  }
};
