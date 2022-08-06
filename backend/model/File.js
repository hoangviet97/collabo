const con = require("../config/db");
const uuid4 = require("uuid4");
const aws = require("aws-sdk");
require("dotenv").config();

const s3 = new aws.S3({
  region: "eu-central-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

class File {
  constructor(id, project_id, title, description, size, file_mimetype) {
    this.id = id;
    this.project_id = project_id;
    this.title = title;
    this.description = description;
    this.size = size;
    this.file_mimetype = file_mimetype;
    this.created_at = new Date();
  }
}

module.exports = {
  File,

  upload3: async function (id, file) {
    const fileId = uuid4();
    let newFile = null;

    const params = {
      Bucket: "collabo-files",
      Key: `${fileId}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const sqlCheck = "SELECT SUM(size) AS total FROM files WHERE projects_id = ?";
    const [rows] = await con.promise().query(sqlCheck, [id]);

    if (parseInt(rows[0].total) + parseInt(file.size) > 20971520) {
      throw new Error("Out of space!");
    } else {
      s3.upload(params, async (err, data) => {});
      const clearedType = file.originalname.split(".");
      newFile = new File(fileId, id, file.originalname, "", file.size, clearedType[clearedType.length - 1]);

      const sql = `INSERT INTO files (id, projects_id, title, description, size, file_mimetype, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const [fileRes] = await con.promise().query(sql, [newFile.id, newFile.project_id, newFile.title, newFile.description, newFile.size, newFile.file_mimetype, newFile.created_at]);
    }

    return newFile;
  },

  uploadAttachment: async function (id, file, task) {
    try {
      const fileRes = await this.upload3(id, file);

      const sql = `INSERT INTO tasks_has_files (tasks_id, files_id) VALUES (?, ?)`;
      const [rows] = await con.promise().query(sql, [task, fileRes.id]);

      return fileRes;
    } catch (err) {
      console.log(err);
    }
  },

  find: async function (id) {
    const sql = `SELECT * FROM files WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  findTypes: async function (id) {
    const sql = `SELECT distinct file_mimetype AS type, COUNT(files.id) AS total, SUM(files.size) AS sum FROM files
                  WHERE projects_id = ?
                  GROUP BY file_mimetype;`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  },

  findByTasks: async function (task_id) {
    const sql = `SELECT files.id AS id, files.title, files.size, files.file_mimetype, files.created_at FROM tasks_has_files
                  INNER JOIN tasks on tasks_has_files.tasks_id = tasks.id
                  INNER JOIN files ON tasks_has_files.files_id = files.id
                   WHERE tasks_has_files.tasks_id = ?`;
    const [rows] = await con.promise().query(sql, [task_id]);

    return rows;
  },

  findByFolder: async function (folder_id) {
    const sql = `SELECT * FROM files WHERE folders_id = ?`;

    const [rows] = await con.promise().query(sql, [folder_id]);

    return rows;
  },

  download2: async function (id, result) {
    const s3 = new aws.S3({
      region: "eu-central-1",
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });

    let x = await s3
      .getObject({
        Bucket: "collabo-files",
        Key: "6ab5iz.jpg"
      })
      .createReadStream();

    result(null, x.Body);
  },

  addFolder: async function (folder_id, id) {
    const sql = `UPDATE files SET folders_id = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [folder_id, id]);

    return rows;
  },

  ejectFile: async function (file_id, task_id) {
    const sql = `DELETE FROM tasks_has_files WHERE files_id = ? AND tasks_id = ?`;

    const [rows] = await con.promise().query(sql, [file_id, task_id]);

    return rows;
  },

  delete: function (id, result) {
    const s3 = new aws.S3({
      region: "eu-central-1",
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });

    let params = {
      Bucket: "collabo-files",
      Key: id
    };

    s3.deleteObject(params, async function (err, data) {
      if (err) {
        result(err, null);
        return;
      }

      const sql = `DELETE FROM files WHERE id = ?`;

      con.query(sql, [id], (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, "success");
        return;
      });
    });
  }
};
