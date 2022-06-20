const con = require("../config/db");
const uuid4 = require("uuid4");
const Member = require("./Member");

class Invitation {
  constructor(id, sender, receiver, project) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.created_at = new Date();
    this.project = project;
    this.seen = false;
  }
}

module.exports = {
  // Invitation class
  Invitation,

  // Create new member by user or by admin
  create: async function (receiver_email, sender, project, result) {
    con.query("SELECT id FROM users WHERE email = ?", [receiver_email], (err, receiver_id_result) => {
      if (err) {
        result(err, null);
        return;
      }

      if (receiver_id_result.length > 0) {
        if (receiver_id_result[0].id === sender) {
          result("You cannot invite yourself", null);
          return;
        }

        const invitation = new Invitation(uuid4(), sender, receiver_id_result[0].id, project);
        const sql = `INSERT INTO invitations (id, sender, receiver, created_at, projects_id, seen) VALUES (?, ?, ?, ?, ?, ?)`;

        con.query(sql, [invitation.id, invitation.sender, invitation.receiver, invitation.created_at, invitation.project, invitation.seen], (err, res) => {
          if (err) {
            result(err, null);
            return;
          }

          result(null, invitation);
        });
      } else {
        result("E-mail doesn't exist", null);
      }
    });
  },

  // Get all user's invitations
  find: async function (user) {
    const sql = `SELECT invitations.*, users.firstname, users.lastname, projects.name AS project_name FROM invitations INNER JOIN users ON invitations.sender = users.id INNER JOIN projects ON invitations.projects_id = projects.id WHERE receiver = ?`;

    const [rows] = await con.promise().query(sql, [user]);

    return rows;
  },

  accept: async function (id, user, project) {
    const sql = `INSERT INTO members (id, users_id, roles_id, projects_id, created_at) VALUES (?, ?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [project]);

    const memberQuery = await Member.create(user, project, "0");
    const invitationQuery = await this.Invitation.deleteInvitation(id);

    return rows;
  },

  // Get all project invitations
  findAll: async function (project) {
    const sql = `SELECT invitations.*, users.email FROM invitations INNER JOIN users ON invitations.receiver = users.id WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, [project]);

    return rows;
  },

  // Get all invitations
  updateSeenStatus: async function (id) {
    const sql = `UPDATE invitations SET seen = true WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return 1;
  },

  deleteInvitation: async function (id) {
    const sql = `DELETE from invitations WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  }
};
