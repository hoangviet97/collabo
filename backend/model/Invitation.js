const con = require("../config/db");
const uuid4 = require("uuid4");

class Invitation {
  constructor(id, sender, receiver, project) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.project = project;
    this.created_at = new Date();
  }
}

module.exports = {
  // Invitation class
  Invitation,

  // Create new member by user or by admin
  createInvitation: async function (body, result) {
    const invitation = new Invitation(uuid4(), body.senderId, body.receiverId, body.projectId);
    const sql = `INSERT INTO invitations (id, sender, receiver, project_id, created_at) VALUES (?, ?, ?, ?, ?)`;

    con.query(sql, [invitation.id, invitation.sender, invitation.receiver, invitation.project, invitation.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  // Get all invitations
  getAllInvitations: async function (body, result) {
    const sql = `SELECT * FROM invitations WHERE receiver = ?`;

    con.query(sql, [body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res.data);
      return;
    });
  }
};
