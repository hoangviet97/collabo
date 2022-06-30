const con = require("../config/db");
const uuid4 = require("uuid4");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

class User {
  constructor(id, email, password, firstname, lastname) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.created_at = new Date();
    this.verification_status = "pending";
    this.token = uuid4();
  }
}

module.exports = {
  User,

  createUser: async function (data, result) {
    const email_check_sql = `SELECT * FROM users WHERE email = ?`;

    con.query(email_check_sql, [data.email], async (err, res) => {
      if (Object.keys(res).length > 0) {
        result("Email already exist", null);
        return;
      } else {
        const newUser = new User(uuid4(), data.email, data.password, data.firstname, data.lastname);

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(data.password, salt);

        const sql = `INSERT INTO users (id, email, password, firstname, lastname, created_at, verification_status, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        con.query(sql, [newUser.id, newUser.email, newUser.password, newUser.firstname, newUser.lastname, newUser.created_at, newUser.verification_status, newUser.token], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          const transport = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587,
            auth: {
              user: "hoangviet97@outlook.com",
              pass: "dobroviz192"
            }
          });

          const url = `http://localhost:3001/verify/${newUser.token}`;

          let mailOpt = {
            from: "hoangviet97@outlook.com",
            to: newUser.email,
            subject: "E-mail confirmation",
            text: `Click here for activate your collabo account: ${url}`
          };

          transport.sendMail(mailOpt, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(info.response);
            }
          });

          result(null, "Success...");
          return;
        });
      }
    });
  },

  // login existing user
  loginUser: function (data, result) {
    const sql = `SELECT id, password, verification_status FROM users WHERE email = '${data.email}'`;
    con.query(sql, async (err, res) => {
      if (res[0].verification_status === "pending") {
        result("This account is not activated!", null);
        return;
      } else {
        if (Object.keys(res).length === 0) {
          result("Invalid credentionals", null);
          return;
        }
        const isMatch = await bcrypt.compare(data.password, res[0].password, (err, matched) => {
          if (err || matched === false) {
            console.log(matched);
            result("Invalid credentionals", null);
            return;
          }

          const payload = {
            user: {
              id: res[0].id
            }
          };

          jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5 days" }, (err, token) => {
            if (err) throw err;
            result(null, token);
            return;
          });
        });
      }
    });
  },

  // get current logged in user --> client loaduser()
  getUser: async function (id) {
    const sql = `SELECT users.id, users.email, users.firstname, users.lastname, users.created_at FROM users WHERE id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  },

  verify: function (token, result) {
    const sql = `SELECT users.id, users.email, users.token, users.verification_status FROM users WHERE users.token = '${token}'`;
    con.query(sql, async (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length === 0) {
        result("not exist", null);
        return;
      }

      if (res[0].verification_status === "pending") {
        const sql = "UPDATE users SET verification_status = ? WHERE token = ?";
        con.query(sql, ["active", token], async (err, res) => {
          result(null, res);
          return;
        });
      }

      result(null, res);
      return;
    });
  },

  verify2: async function (token) {
    const sql = `SELECT users.id, users.email, users.token, users.verification_status FROM users WHERE users.token = '${token}'`;

    const [rows] = await con.promise().query(sql, token);

    if (rows.length < 1) {
      throw new Error("Invalid token");
    }

    if (rows[0].verification_status === "pending") {
      const sqlVer = "UPDATE users SET verification_status = ? WHERE token = ?";
      const ver = await con.promise().query(sqlVer, ["active", token]);

      return "activated";
    } else if (rows[0].verification_status === "active") {
      throw new Error("This account is already active");
    }
  },

  changePwd: async function (body, id, result) {
    const checkSql = `SELECT password FROM users WHERE id = ?`;

    con.query(checkSql, [id], async (err, res) => {
      const isMatch = await bcrypt.compare(body.currentPassword, res[0].password, (err, matched) => {
        if (err || matched === false) {
          result("Invalid credentionals", null);
          return;
        }
      });

      const salt = await bcrypt.genSalt(10);
      const pwd = await bcrypt.hash(body.newPassword, salt);

      const sql = "UPDATE users SET password = ? WHERE id = ?";

      con.query(sql, [pwd, id], (err, res) => {
        result(null, "success");
        return;
      });
    });
  },

  changeFirstname: async function (id, name) {
    const sql = `UPDATE users SET firstname = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [name, id]);

    return rows;
  },

  changeLastname: async function (id, name) {
    const sql = `UPDATE users SET lastname = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [name, id]);

    return rows;
  },

  getIdByEmail: async function (email) {
    const sql = `SELECT id FROM users WHERE email = ?`;
    const clearedEmail = email.trim();

    const [rows] = await con.promise().query(sql, [clearedEmail]);

    if (rows.length > 0) {
      return rows[0].id;
    } else {
      return rows;
    }
  },

  resetPwd: function (body, result) {
    const sql = `SELECT id FROM users WHERE email = '${body.email}'`;
    con.query(sql, async (err, res) => {
      if (Object.keys(res).length === 0) {
        result("User doesnt exists", null);
        return;
      }

      const newToken = uuid4();

      const sqlToken = `UPDATE users SET token = ? WHERE email = ?`;
      con.query(sqlToken, [newToken, body.email]);

      const transport = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587,
        auth: {
          user: "hoangviet97@outlook.com",
          pass: "dobroviz192"
        }
      });

      const url = `http://localhost:3000/pwd-reset/${newToken}`;

      let mailOpt = {
        from: "hoangviet97@outlook.com",
        to: body.email,
        subject: "Reset password",
        text: `Click here to set your new password: ${url}`
      };

      transport.sendMail(mailOpt, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });
    });
  }
};
