const con = require("../config/db");
const uuid4 = require("uuid4");

class Post {
  constructor(id, text, projects_id, users_id) {
    this.id = id;
    this.text = text;
    this.created_at = new Date();
    this.projects_id = projects_id;
    this.users_id = users_id;
  }
}

module.exports = {
  Post,
  // create new member by user or by admin
  create: async function (body, user, result) {
    const newPost = new Post(uuid4(), body.text, body.projectId, user);

    const sql = `INSERT INTO posts (id, text, created_at, projects_id, users_id) VALUES (?, ?, ?, ?, ?)`;
    con.query(sql, [newPost.id, newPost.text, newPost.created_at, newPost.projects_id, newPost.users_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newPost);
      return;
    });
  },

  delete: async function (id, result) {
    const sql = `DELETE FROM posts WHERE id = ?`;
    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  find: async function (projectId, result) {
    const sql = `SELECT * FROM posts WHERE projects_id = ? ORDER BY created_at`;

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
