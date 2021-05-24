const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  // create new member by user or by admin
  createSection: async function (body, result) {
    const newSection = {
      id: uuid4(),
      projectId: body.id,
      name: body.name,
      created_at: new Date()
    };

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

  deleteSection: async function (id, result) {
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

  getAllSections: async function (projectId, result) {
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
