const con = require("../config/db");
const uuid4 = require("uuid4");

class File {
  constructor(id, title, description, file_path, file_mimetype, project_id) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.file_path = file_path;
    this.file_mimetype = file_mimetype;
    this.created_at = new Date();
    this.project_id = project_id;
  }
}

module.exports = {
  File,
  // create new member by user or by admin
  upload: async function (body, file, result) {
    console.log(file.originalname);
    const fileTitle = body.title === undefined || body.title === null || body.title === "" ? file.originalname : body.title;
    const newFile = new File(uuid4(), fileTitle, body.description, file.path, file.mimetype, body.project_id);

    const sql = `INSERT INTO files (id, title, description, file_path, file_mimetype, created_at, projects_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newFile.id, newFile.title, newFile.description, newFile.file_path, newFile.file_mimetype, newFile.created_at, newFile.project_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newFile);
      return;
    });
  },

  find: async function (project_id, result) {
    const sql = `SELECT * FROM files WHERE projects_id = ?`;

    con.query(sql, [project_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  download: async function (id, result) {
    const sql = `SELECT * FROM files WHERE id = ?`;

    con.query(sql, [id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res[0]);
      return;
    });
  }
};
