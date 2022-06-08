const con = require("../config/db");
const uuid4 = require("uuid4");

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

  // Get all invitations
  find: async function (user, result) {
    const sql = `SELECT invitations.*, users.firstname, users.lastname, projects.name AS project_name FROM invitations INNER JOIN users ON invitations.sender = users.id INNER JOIN projects ON invitations.projects_id = projects.id WHERE receiver = ?`;

    con.query(sql, [user], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  accept: async function (id, user, project, result) {
    const sql = `INSERT INTO members (id, users_id, roles_id, projects_id, created_at) VALUES (?, ?, ?, ?, ?)`;

    con.query(sql, [uuid4(), user, 0, project, new Date()], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      const sql = `DELETE from invitations WHERE id = ?`;

      con.query(sql, [id], (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, res);
        return;
      });
    });
  },

  // Get all invitations
  findAll: async function (project, result) {
    const sql = `SELECT invitations.*, users.email FROM invitations INNER JOIN users ON invitations.receiver = users.id WHERE projects_id = ?`;

    con.query(sql, [project], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  // Get all invitations
  updateSeenStatus: async function (id, result) {
    const sql = `UPDATE invitations SET seen = true WHERE id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, 1);
      return;
    });
  },

  deleteInvitation: async function (id, result) {
    const sql = `DELETE from invitations WHERE id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "sucess");
      return;
    });
  }
};
