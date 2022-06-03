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

  upload2: async function (id, body, file, result) {
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
      const newFile = new File(fileId, id, file.originalname, body.description, file.size, clearedType[clearedType.length - 1]);

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

  find: async function (id, result) {
    const sql = `SELECT * FROM files WHERE projects_id = ?`;

    con.query(sql, [id], (err, res) => {
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

  addFolder: async function (folder_id, id, result) {
    const sql = `UPDATE files SET folders_id = ? WHERE id = ?`;

    con.query(sql, [folder_id, id], (err, res) => {
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
