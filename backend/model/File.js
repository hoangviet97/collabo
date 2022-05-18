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

  // create new member by user or by admin
  upload: async function (body, file, result) {
    const clearedType = file.originalname.split(".");

    const fileTitle = body.title === undefined || body.title === null || body.title === "" ? file.originalname : body.title;
    const newFile = new File(uuid4(), fileTitle, body.description, file.size, file.path, clearedType[clearedType.length - 1], body.project_id);

    const sql = `INSERT INTO files (id, title, description, size, file_path, file_mimetype, created_at, projects_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    con.query(sql, [newFile.id, newFile.title, newFile.description, newFile.size, newFile.file_path, newFile.file_mimetype, newFile.created_at, newFile.project_id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, newFile);
      return;
    });
  },

  upload2: async function (body, file, result) {
    console.log(file);
    console.log(body);
    const fileId = uuid4();

    const params = {
      Bucket: "collabo-files",
      Key: `${fileId}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    s3.upload(params, (err, data) => {
      if (err) {
        result(err, null);
        return;
      }

      const clearedType = file.originalname.split(".");
      const newFile = new File(fileId, body.project_id, file.originalname, body.description, file.size, clearedType[clearedType.length - 1]);

      const sql = `INSERT INTO files (id, projects_id, title, description, size, file_mimetype, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      con.query(sql, [newFile.id, newFile.project_id, newFile.title, newFile.description, newFile.size, newFile.file_mimetype, newFile.created_at], (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, newFile);
        return;
      });
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

  findByFolder: async function (folder_id, result) {
    const sql = `SELECT * FROM files WHERE folders_id = ?`;

    con.query(sql, [folder_id], (err, res) => {
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

  addFolder: async function (body, result) {
    const sql = `UPDATE files SET folders_id = ? WHERE id = ?`;

    con.query(sql, [body.folder_id, body.id], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, "success");
      return;
    });
  },

  delete: async function (id, result) {
    const s3 = new aws.S3({
      region: "eu-central-1",
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY
    });

    let params = {
      Bucket: "collabo-files",
      Key: id
    };

    s3.deleteObject(params, function (err, data) {
      if (err) {
        result(err, null);
        return;
      }
    });
  }
};
