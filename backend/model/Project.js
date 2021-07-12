const con = require("../config/db");
const uuid4 = require("uuid4");
const randomInt = require("random-int");

module.exports = {
  // create new user
  createProject: async function (data, result) {
    let randId = randomInt(10000000, 99999999);

    const newProject = {
      id: randId,
      name: data.name,
      description: data.description,
      created_at: new Date(),
      color: "#535c68",
      status: 0,
      favorite: false
    };

    const sql = `INSERT INTO projects (id, name, description, created_at, color, project_status_id, favorite) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newProject.id, newProject.name, newProject.description, newProject.created_at, newProject.color, newProject.status, newProject.favorite], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, { projectData: newProject, projectId: newProject.id });
      return;
    });
  },

  // get all project from user x
  getAllProjects: function (userId, result) {
    const sql = `SELECT projects.id, projects.name, projects.description, projects.favorite FROM members RIGHT JOIN projects ON members.projects_id = projects.id WHERE members.users_id = ?`;
    con.query(sql, [userId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  // get current project
  getProject: function (projectId, memberId, result) {
    const sql = `SELECT projects.*, roles.name AS role
                  FROM members 
                  INNER JOIN projects ON members.projects_id = projects.id 
                  INNER JOIN roles ON members.roles_id = roles.id 
                  WHERE members.projects_id = ? AND members.users_id = ?`;
    con.query(sql, [projectId, memberId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    });
  },

  // get current project
  setFavoriteProject: function (body, result) {
    const sql = `UPDATE projects SET favorite = ? WHERE id = ?`;
    con.query(sql, [body.status, body.projectId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    });
  },

  // get current project
  updateColor: function (body, result) {
    const sql = `UPDATE projects SET color = ? WHERE id = ?`;
    con.query(sql, [body.color, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    });
  }
};
