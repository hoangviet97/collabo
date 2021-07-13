const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  // create new member by user or by admin
  createInvitation: async function (body, result) {
    const invitation = {
      id: uuid4(),
      sender: body.senderId,
      receiver: body.receiverId,
      project: body.projectId,
      created_at: new Date()
    };

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
