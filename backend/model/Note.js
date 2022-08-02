const con = require("../config/db");
const uuid4 = require("uuid4");

class Note {
  constructor(id, session_id, text) {
    this.id = id;
    this.session_id = session_id;
    this.text = text;
    this.created_at = new Date();
  }
}

module.exports = {
  Note,
  // create new member by user or by admin
  create: async function (id, text) {
    const newNote = new Note(uuid4(), id, text);
    const sql = `INSERT INTO notes (id, sessions_id, text, created_at) VALUES (?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newNote.id, newNote.session_id, newNote.text, newNote.created_at]);

    return newNote;
  },

  find: async function (session_id) {
    const sql = `SELECT * FROM notes WHERE sessions_id = ?`;

    const [rows] = await con.promise().query(sql, [session_id]);

    return rows;
  },

  update: async function (id, text) {
    const sql = `UPDATE notes SET text = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [text, id]);

    return rows;
  }
};
