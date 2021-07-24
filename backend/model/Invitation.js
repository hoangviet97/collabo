const con = require("../config/db");
const uuid4 = require("uuid4");

class Invitation {
  constructor(id, sender, receiver, project) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.created_at = new Date();
    this.project = project;
  }
}

module.exports = {
  // Invitation class
  Invitation,

  // Create new member by user or by admin
  create: async function (body, sender, result) {
    con.query("SELECT id FROM users WHERE email = ?", [body.receiver_email], (err, receiver_id_result) => {
      if (err) {
        result(err, null);
        return;
      }

      if (receiver_id_result.length > 0) {
        const invitation = new Invitation(uuid4(), sender, receiver_id_result[0].id, body.project);
        const sql = `INSERT INTO invitations (id, sender, receiver, created_at, projects_id) VALUES (?, ?, ?, ?, ?)`;

        con.query(sql, [invitation.id, invitation.sender, invitation.receiver, invitation.created_at, invitation.project], (err, res) => {
          if (err) {
            result(err, null);
            return;
          }

          result(null, invitation);
        });
      } else {
        result("not found", null);
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
  }
};
