const con = require("../config/db");
const randomInt = require("random-int");

class Project {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = new Date();
    this.color = "#535c68";
    this.status = 0;
    this.favorite = false;
  }
}

module.exports = {
  Project,
  // create new user
  create: async function (data, result) {
    let randId = randomInt(10000000, 99999999);
    const newProject = new Project(randId, data.name, data.description);

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
  find: async function (userId, result) {
    const sql = `SELECT projects.id, projects.name, projects.description, projects.created_at, projects.favorite, projects.project_status_id AS status_id ,project_status.name AS status
                  FROM members 
                  RIGHT JOIN projects ON members.projects_id = projects.id 
                  INNER JOIN project_status ON projects.project_status_id = project_status.id 
                  WHERE members.users_id = ?`;
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
  findOne: function (projectId, memberId, result) {
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

      if (res.length > 0) {
        result(null, res);
        return;
      } else {
        result("not found", null);
        return;
      }
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
  },

  // get current project
  updateStatus: function (body, result) {
    const sql = `UPDATE projects SET project_status_id = ? WHERE id = ?`;
    con.query(sql, [body.status, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    });
  }
};
