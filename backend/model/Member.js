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
  create: async function (userId, project, result) {
    const newMember = new Member(uuid4(), userId, 0, project);
    const sql = `INSERT INTO members (id, users_id, roles_id, projects_id, created_at) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newMember.id, newMember.userId, newMember.roleId, newMember.projectId, newMember.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, project);
      return;
    });
  },

  find: async function (project, result) {
    const sql = `SELECT members.id, users.id AS user_id, users.email, users.firstname, users.lastname, roles.id AS role_id, roles.name AS role, members.created_at 
                  FROM members 
                  INNER JOIN users ON members.users_id = users.id 
                  INNER JOIN roles ON members.roles_id = roles.id 
                  WHERE projects_id = ?`;

    con.query(sql, [project], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  findAll: async function (result) {
    const sql = `SELECT members.id, members.projects_id AS project_id, users.id AS user_id, users.email, users.firstname, users.lastname
                  FROM members 
                  INNER JOIN users ON members.users_id = users.id `;

    con.query(sql, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  updateRole: async function (role_id, id, result) {
    const sql = `UPDATE members SET roles_id = ? WHERE id = ?`;

    con.query(sql, [role_id, id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  delete: async function (id) {
    const sql = `DELETE from members WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  // get current project
  leave: function (project, user, result) {
    const sql = `DELETE FROM members WHERE users_id = ? AND projects_id = ?`;
    con.query(sql, [user, project], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    });
  }
};
