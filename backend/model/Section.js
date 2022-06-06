const con = require("../config/db");
const uuid4 = require("uuid4");

class Section {
  constructor(id, projectId, name) {
    this.id = id;
    this.projectId = projectId;
    this.name = name;
    this.created_at = new Date();
  }
}

module.exports = {
  Section,
  // create new member by user or by admin
  create: async function (id, name, result) {
    const newSection = new Section(uuid4(), id, name);

    const sql = `INSERT INTO sections (id, projects_id, name, created_at) VALUES (?, ?, ?, ?)`;
    con.query(sql, [newSection.id, newSection.projectId, newSection.name, newSection.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newSection);
      return;
    });
  },

  delete: async function (id, result) {
    const sql = `DELETE FROM sections WHERE id = ?`;
    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  find: async function (projectId, result) {
    const sql = `SELECT id, name FROM sections WHERE projects_id = ?`;

    con.query(sql, [projectId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
