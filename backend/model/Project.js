const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  createProject: function (data, result) {
    const newProject = {
      id: uuid4(),
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

      result(null, res);
      return;
    });
  }
};
