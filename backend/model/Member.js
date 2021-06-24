const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  // create new member by user or by admin
  createMember: async function (userId, projectId, result) {
    const newMember = {
      id: uuid4(),
      userId: userId,
      roleId: 0,
      projectId: projectId,
      created_at: new Date()
    };

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

  getAllMembers: async function (projectId, result) {
    const sql = `SELECT members.id, users.email, users.firstname, users.lastname, roles.name FROM members INNER JOIN users ON members.users_id = users.id INNER JOIN roles ON members.roles_id = roles.id WHERE projects_id = ?`;

    con.query(sql, [projectId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
