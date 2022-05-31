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

          const url = `http://localhost:9000/verify/${newUser.token}`;

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
      console.log(res[0].verification_status);
      if (res[0].verification_status === "pending") {
        result("This account is not activated!", null);
        return;
      } else {
        if (Object.keys(res).length === 0) {
          result("Invalid credentionals", null);
          return;
        }
        const isMatch = await bcrypt.compare(data.password, res[0].password, (err, matched) => {
          if (err || !matched) {
            console.log("invald");
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
  getUser: function (id, result) {
    const sql = `SELECT users.id, users.email, users.firstname, users.lastname, users.created_at FROM users WHERE id = '${id}'`;
    con.query(sql, async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
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

  changePwd: function (id, result) {
    const sql = `UPDATE users SET password = ? WHERE id = ?`;
    con.query(sql, async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  changeFirstname: function (id, name, result) {
    const sql = `UPDATE users SET firstname = ? WHERE id = ?`;
    con.query(sql, [name, id], async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  changeLastname: function (id, name, result) {
    const sql = `UPDATE users SET lastname = ? WHERE id = ?`;
    con.query(sql, [name, id], async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, res);
      return;
    });
  },

  resetPwd: function (body, result) {
    const sql = `SELECT id FROM users WHERE email = '${body.email}'`;
    con.query(sql, async (err, res) => {
      if (Object.keys(res).length === 0) {
        result("User doesnt exists", null);
        return;
      }

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "acerik97@gmail.com",
          pass: "Dobroviz192"
        }
      });

      const newPwd = uuid4();

      let mailOpt = {
        from: "acerik97@gmail.com",
        to: body.email,
        subject: "Password reset",
        text: `Your temporary password: ${newPwd}`
      };

      transport.sendMail(mailOpt, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });

      const sql2 = `UPDATE users password = '${newPwd}' WHERE email = '${body.email}'`;

      con.query(sql2, async (err, res) => {
        if (err) {
          result(err, null);
          return;
        }

        result(null, res);
        return;
      });
    });
  }
};
