const con = require("../config/db");
const uuid4 = require("uuid4");
const Project = require("./Project");

class Income {
  constructor(id, project_id, member_id, title, amount) {
    this.id = id;
    this.project_id = project_id;
    this.member_id = member_id;
    this.title = title;
    this.amount = amount;
    this.created_at = new Date();
  }
}

module.exports = {
  Income,
  // create new member by user or by admin
  create: async function (project, member, title, amount) {
    const newIncome = new Income(uuid4(), project, member, title, amount);
    const sql = `INSERT INTO incomes (id, projects_id, members_id, title, amount, created_at) VALUES (?, ?, ?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newIncome.id, newIncome.project_id, newIncome.member_id, newIncome.title, newIncome.amount, newIncome.created_at]);

    return newIncome;
  },

  find: async function (project) {
    const sql = `SELECT * FROM incomes WHERE projects_id = ? ORDER BY created_at`;

    const [rows] = await con.promise().query(sql, [project]);

    const check = await this.getSum(project);

    console.log(check);

    return rows;
  },

  getSum: async function (project) {
    const sql = `SELECT SUM(incomes.amount) AS sum FROM incomes WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, [project]);

    return rows[0].sum;
  },

  delete: async function (id) {
    const sql = `DELETE FROM incomes WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  }
};
