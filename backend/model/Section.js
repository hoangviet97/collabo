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
  create: async function (id, name) {
    const newSection = new Section(uuid4(), id, name);
    const sql = `INSERT INTO sections (id, projects_id, name, created_at) VALUES (?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newSection.id, newSection.projectId, newSection.name, newSection.created_at]);

    return newSection;
  },

  delete: async function (id) {
    const sql = `DELETE FROM sections WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  find: async function (projectId) {
    const sql = `SELECT id, name FROM sections WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, projectId);

    return rows;
  }
};
