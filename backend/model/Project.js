const con = require("../config/db");
const randomInt = require("random-int");
const Member = require("./Member");

class Project {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created_at = new Date();
    this.color = "#535c68";
    this.status = 0;
    this.favorite = false;
    this.budget = 0;
    this.currency = "czk";
  }
}

module.exports = {
  Project,
  // create new user
  create: async function (data, userId) {
    let randId = randomInt(10000000, 99999999);
    const newProject = new Project(randId, data.name, data.description);
    const color = data.color !== null ? data.color : "#535c68";
    const sql = `INSERT INTO projects (id, name, description, created_at, color, project_status_id, favorite, budget, currency) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newProject.id, newProject.name, newProject.description, newProject.created_at, color, newProject.status, newProject.favorite, newProject.budget, newProject.currency]);
    const memberQuery = await Member.create(userId, newProject.id, "0");

    return newProject;
  },

  // get all project from user x
  find: async function (userId) {
    const sql = `SELECT projects.id, projects.name, projects.description, projects.created_at, projects.favorite, projects.project_status_id AS status_id ,project_status.name AS status
                  FROM members 
                  RIGHT JOIN projects ON members.projects_id = projects.id 
                  INNER JOIN project_status ON projects.project_status_id = project_status.id 
                  WHERE members.users_id = ?`;

    const [rows] = await con.promise().query(sql, [userId]);

    return rows;
  },

  // get current project
  findOne: async function (projectId, memberId) {
    const sql = `SELECT projects.*, roles.name AS role
                  FROM members 
                  INNER JOIN projects ON members.projects_id = projects.id 
                  INNER JOIN roles ON members.roles_id = roles.id 
                  WHERE members.projects_id = ? AND members.users_id = ?`;

    const [rows] = await con.promise().query(sql, [projectId, memberId]);

    return rows;
  },

  setFavoriteProject: async function (status, id) {
    const sql = `UPDATE projects SET favorite = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [status, id]);

    return rows;
  },

  setBudget: async function (budget, id) {
    const sql = `UPDATE projects SET budget = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [budget, id]);

    return rows;
  },

  setBudgetIncome: async function (id, income) {
    const sql = `SELECT budget AS FROM projects WHERE id = ?`;
    const [curr] = await con.promise().query(sql, [id]);

    const res = curr[0].budget;
    const newBudget = res + income;

    const sql2 = `UPDATE projects SET budget = ? WHERE id = ?`;
    const [updated] = await con.promise().query(sql2, [newBudget, id]);

    return updated;
  },

  setCurrency: async function (currency, id) {
    const sql = `UPDATE projects SET currency = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [currency, id]);

    return rows;
  },

  updateColor: async function (color, id) {
    const sql = `UPDATE projects SET color = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [color, id]);

    return rows;
  },

  updateStatus: async function (status, id) {
    const sql = `UPDATE projects SET project_status_id = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [status, id]);

    return rows;
  },

  delete: async function (id) {
    const sql = `DELETE from projects WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  }
};
