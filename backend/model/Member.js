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
    const sql = `SELECT members.id, users.id AS user_id, users.email, users.firstname, users.lastname, users.color, roles.id AS role_id, roles.name AS role, members.created_at 
                  FROM members 
                  INNER JOIN users ON members.users_id = users.id 
                  INNER JOIN roles ON members.roles_id = roles.id 
                  WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, [project]);

    return rows;
  },

  findAll: async function (userId, result) {
    const sql = `SELECT members.id, members.projects_id AS project_id, users.id AS user_id, users.email, users.firstname, users.lastname, users.color
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

  updateRole: async function (role_id, id, member, project) {
    const updated = await this.findRole(id);
    const updater = await this.findRole(member);

    const checkMembers = await this.find(project);

    if (updater === "Admin" && updated === "Owner") {
      throw new Error("You cannot change role of the owner!");
    } else if (updater === "Admin" && role_id === "0") {
      throw new Error("You have no permission for this action!");
    } else if (updater === "Owner" && role_id !== "0" && checkMembers.length === 1) {
      throw new Error("You cannot change your role right now!");
    } else {
      const sql = `UPDATE members SET roles_id = ? WHERE id = ?`;
      const [rows] = await con.promise().query(sql, [role_id, id]);
    }

    return { role_id, id };
  },

  delete: async function (id, member) {
    const kicked = await this.findRole(id);
    const kicker = await this.findRole(member);

    if (kicker === "Admin" && kicked === "Owner") {
      throw new Error("You have no permission to kick the Owner!");
    } else {
      const sql = `DELETE from members WHERE id = ?`;
      const [rows] = await con.promise().query(sql, [id]);
    }

    return id;
  },

  leave2: async function (project, member) {
    const selfRole = await this.findRole(member);

    const sqlRoles = `SELECT * FROM members
                  WHERE members.projects_id = ?
                  GROUP BY members.id
                  HAVING roles_id = '0'`;

    const [checkRoles] = await con.promise().query(sqlRoles, project);

    if (checkRoles.length === 1 && selfRole === "Owner") {
      throw new Error("You must choose new Owner before you leave");
    } else {
      const sql = `DELETE FROM members WHERE id = ?`;

      const [rows] = await con.promise().query(sql, member);
    }

    return "ok";
  },

  findRole: async function (id) {
    const sqlCheck = `SELECT roles.name FROM members INNER JOIN roles ON members.roles_id = roles.id WHERE members.id = ?`;

    const [rows] = await con.promise().query(sqlCheck, [id]);

    return rows[0].name;
  }
};
