const con = require("../config/db");
const uuid4 = require("uuid4");

class Folder {
  constructor(id, title, project_id) {
    this.id = id;
    this.title = title;
    this.created_at = new Date();
    this.project_id = project_id;
  }
}

module.exports = {
  Folder,
  // create new member by user or by admin
  create: async function (body, result) {
    const newFolder = new Folder(uuid4(), body.title, body.project_id);

    const sql = `INSERT INTO folders (id, title, created_at, projects_id) VALUES (?, ?, ?, ?)`;
    con.query(sql, [newFolder.id, newFolder.title, newFolder.created_at, newFolder.project_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newFolder);
      return;
    });
  },

  findOne: async function (id, result) {
    const sql = `SELECT * FROM folders WHERE id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  find: async function (project_id, result) {
    const sql = `SELECT * FROM folders WHERE projects_id = ?`;

    con.query(sql, [project_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
