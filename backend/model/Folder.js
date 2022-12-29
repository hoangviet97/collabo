const con = require("../config/db");
const uuid4 = require("uuid4");

class Folder {
  constructor(id, title, project_id) {
    this.id = id;
    this.title = title;
    this.created_at = new Date();
    this.project_id = project_id;
  }
}

module.exports = {
  Folder,
  // create new member by user or by admin
  create: async function (title, id) {
    const newFolder = new Folder(uuid4(), title, id);
    const sql = `INSERT INTO folders (id, title, created_at, projects_id) VALUES (?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newFolder.id, newFolder.title, newFolder.created_at, newFolder.project_id]);

    return newFolder;
  },

  findOne: async function (id) {
    const sql = `SELECT * FROM folders WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  find: async function (project_id) {
    const sql = `SELECT folders.title, folders.id, COUNT(files.folders_id) AS total_files FROM folders
                    LEFT JOIN files ON files.folders_id = folders.id
                    WHERE folders.projects_id = ?
                    GROUP BY folders.title, folders.id`;

    const [rows] = await con.promise().query(sql, [project_id]);

    return rows;
  },

  delete: async function (id) {
    const sql = `DELETE FROM folders WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  }
};
