const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  // create new member by user or by admin
  createChannel: async function (body, result) {
    const newChannel = {
      id: uuid4(),
      projectId: body.projectId,
      name: body.name,
      private: body.isPrivate,
      created_at: new Date()
    };

    const sql = `INSERT INTO channels (id, projects_id, name, private, created_at) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newChannel.id, newChannel.projectId, newChannel.name, newChannel.private, newChannel.created_at], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newChannel);
      return;
    });
  },

  deleteChannel: async function (id, result) {
    const sql = `DELETE FROM channels WHERE id = ?`;
    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  getAllChannels: async function (projectId, result) {
    const sql = `SELECT * FROM channels WHERE projects_id = ?`;

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
