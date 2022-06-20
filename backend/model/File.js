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
    const fileId = uuid4();

    const params = {
      Bucket: "collabo-files",
      Key: `${fileId}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    const sqlCheck = "SELECT SUM(size) AS total FROM files WHERE projects_id = ?";
    con.query(sqlCheck, [id], (err, checkRes) => {
      console.log(parseInt(checkRes[0].total) + parseInt(file.size));
      if (parseInt(checkRes[0].total) + parseInt(file.size) > 20971520) {
        result("Out of space!", null);
      } else {
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
      }
    });
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
