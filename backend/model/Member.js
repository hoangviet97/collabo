const con = require("../config/db");
const uuid4 = require("uuid4");

class Member {
  constructor(id, userId, roleId, projectId) {
    this.id = id;
    this.userId = userId;
    this.roleId = roleId;
    this.projectId = projectId;
    this.created_at = new Date();
  }
}

module.exports = {
  Member,
  // create new member by user or by admin
  create: async function (userId, project, role) {
    const newMember = new Member(uuid4(), userId, role, project);
    const sql = `INSERT INTO members (id, users_id, roles_id, projects_id, created_at) VALUES (?, ?, ?, ?, ?)`;
    const [rows] = await con.promise().query(sql, [newMember.id, newMember.userId, newMember.roleId, newMember.projectId, newMember.created_at]);

    return project;
  },

  find: async function (project) {
    const sql = `SELECT members.id, users.id AS user_id, users.email, users.firstname, users.lastname, roles.id AS role_id, roles.name AS role, members.created_at 
                  FROM members 
                  INNER JOIN users ON members.users_id = users.id 
                  INNER JOIN roles ON members.roles_id = roles.id 
                  WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, [project]);

    return rows;
  },

  findAll: async function (userId, result) {
    const sql = `SELECT members.id, members.projects_id AS project_id, users.id AS user_id, users.email, users.firstname, users.lastname
                  FROM members 
                  INNER JOIN users ON members.users_id = users.id 
                  `;

    con.query(sql, [userId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  findMember: async function (id, project) {
    const sql = `SELECT * FROM members WHERE users_id = '${id}' AND projects_id = ${project}`;

    const [rows] = await con.promise().query(sql);

    return rows;
  },

  updateRole: async function (role_id, id) {
    const ownerRole = "0";
    const sqlCheck = `SELECT * FROM members WHERE roles_id = ${ownerRole} AND projects_id = ${project}`;

    const sql = `UPDATE members SET roles_id = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [role_id, id]);

    return rows;
  },

  delete: async function (id) {
    const sqlCheck = `SELECT roles.name FROM members INNER JOIN roles ON members.roles_id = roles.id WHERE members.id = ?`;
    const [roleCheck] = await con.promise().query(sqlCheck, [id]);

    const sql = `DELETE from members WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  // get current project
  leave: async function (project, user) {
    const sql = `DELETE FROM members WHERE users_id = ? AND projects_id = ?`;

    const [rows] = await con.promise().query(sql, [user, project]);

    return rows;
  }
};
