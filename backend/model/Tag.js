const con = require("../config/db");
const uuid4 = require("uuid4");

class Tag {
  constructor(id, projects_id, name, color) {
    this.id = id;
    this.projects_id = projects_id;
    this.name = name;
    this.color = color;
  }
}

module.exports = {
  Tag,
  // create new member by user or by admin
  create: async function (body, result) {
    const newTag = new Tag(uuid4(), body.project, body.name, body.color);

    const sql = `INSERT INTO tags (id, projects_id, name, color) VALUES (?, ?, ?, ?)`;
    con.query(sql, [newTag.id, newTag.projects_id, newTag.name, newTag.color], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newTag);
      return;
    });
  },

  createTaskTag: async function (body, result) {
    const sql = `INSERT INTO tasks_has_tags (tasks_id, tags_id) VALUES (?, ?)`;
    con.query(sql, [body.task, body.tag], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "succeess");
      return;
    });
  },

  find: async function (id, result) {
    const sql = `SELECT * FROM tags WHERE projects_id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  findByTasks: async function (project, result) {
    const sql = `SELECT tags_id, tasks_id, tags.name, tags.color
                    FROM tasks_has_tags 
                    INNER JOIN tags ON tasks_has_tags.tags_id = tags.id
                    INNER JOIN tasks ON tasks_has_tags.tasks_id = tasks.id
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    INNER JOIN projects ON sections.projects_id = projects.id
                    WHERE projects.id = ?`;

    con.query(sql, [project], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  deleteTag: async function (id, result) {
    const sql = `DELETE FROM tags WHERE id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  }
};
