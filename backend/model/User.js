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

        const sql = `INSERT INTO users (id, email, password, firstname, lastname, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
        con.query(sql, [newUser.id, newUser.email, newUser.password, newUser.firstname, newUser.lastname, newUser.created_at], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          result(null, "Success...");
          return;
        });
      }
    });
  },

  // login existing user
  loginUser: function (data, result) {
    const sql = `SELECT id, password FROM users WHERE email = '${data.email}'`;
    con.query(sql, async (err, res) => {
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

  changeName: function (id, result) {
    const sql = `UPDATE users SET firstname = ? AND lastname = ? WHERE id = ?`;
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
