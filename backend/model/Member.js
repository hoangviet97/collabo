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
  create: async function (userId, projectId, result) {
    const newMember = new Member(uuid4(), userId, 0, projectId);

    const sql = `INSERT INTO members (id, users_id, roles_id, projects_id, created_at) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newMember.id, newMember.userId, newMember.roleId, newMember.projectId, newMember.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, projectId);
      return;
    });
  },

  find: async function (projectId, result) {
    const sql = `SELECT members.id, users.email, users.firstname, users.lastname, roles.id AS role_id, roles.name AS role, members.created_at FROM members INNER JOIN users ON members.users_id = users.id INNER JOIN roles ON members.roles_id = roles.id WHERE projects_id = ?`;

    con.query(sql, [projectId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  updateRole: async function (body, result) {
    const sql = `UPDATE members SET roles_id = ? WHERE id = ?`;

    con.query(sql, [body.role_id, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  delete: async function (body, result) {
    const sql = `DELETE from members WHERE id = ?`;

    con.query(sql, [body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
