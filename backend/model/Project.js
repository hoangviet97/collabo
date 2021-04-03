const con = require("../config/db");
const uuid4 = require("uuid4");
const randomInt = require("random-int");

module.exports = {
  createProject: async function (data, result) {
    let randId = randomInt(10000000, 99999999);

    const newProject = {
      id: randId,
      name: data.name,
      description: data.description,
      created_at: new Date()
    };

    const sql = `INSERT INTO projects (id, name, description, created_at) VALUES (?, ?, ?, ?)`;
    con.query(sql, [newProject.id, newProject.name, newProject.description, newProject.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newProject.id);
      return;
    });
  },

  getAllProjects: function (userId, result) {
    const sql = `SELECT projects.name, projects.description FROM members RIGHT JOIN projects ON members.projects_id = projects.id WHERE users_id = ?`;
    con.query(sql, [userId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
