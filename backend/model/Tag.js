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
  create: async function (body, project) {
    const newTag = new Tag(uuid4(), project, body.name, body.color);
    const sql = `INSERT INTO tags (id, projects_id, name, color) VALUES (?, ?, ?, ?)`;

    const result = await con.promise().query(sql, [newTag.id, newTag.projects_id, newTag.name, newTag.color]);

    return newTag;
  },

  createTaskTag: async function (body) {
    const sql = `INSERT INTO tasks_has_tags (tasks_id, tags_id) VALUES (?, ?)`;

    const result = await con.promise().query(sql, [body.task, body.tag]);

    return result;
  },

  // find all tags
  find: async function (id) {
    const sql = `SELECT * FROM tags WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  },

  findByTasks: async function (project) {
    const sql = `SELECT tags_id, tasks_id, tags.name, tags.color
                    FROM tasks_has_tags 
                    INNER JOIN tags ON tasks_has_tags.tags_id = tags.id
                    INNER JOIN tasks ON tasks_has_tags.tasks_id = tasks.id
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    INNER JOIN projects ON sections.projects_id = projects.id
                    WHERE projects.id = ?`;

    const [rows] = await con.promise().query(sql, [project]);

    return rows;
  },

  deleteTag: async function (id) {
    const sql = `DELETE FROM tags WHERE id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  }
};
