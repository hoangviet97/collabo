const con = require("../config/db");
const uuid4 = require("uuid4");

module.exports = {
  // create new member by user or by admin
  createPost: async function (body, user, result) {
    const newPost = {
      id: uuid4(),
      text: body.text,
      created_at: new Date(),
      projects_id: body.projectId,
      users_id: user
    };

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

  deletePost: async function (id, result) {
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

  getAllPosts: async function (projectId, result) {
    const sql = `SELECT * FROM posts WHERE projects_id = ?`;

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
