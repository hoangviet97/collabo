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
    this.color = "";
  }
}

module.exports = {
  User,

  createUser: async function (data) {
    const checkEmail = await this.checkUser(data.email);

    if (checkEmail.length === 1) {
      throw new Error("E-mail already exist");
    } else {
      const newUser = new User(uuid4(), data.email, data.password, data.firstname, data.lastname);
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(data.password, salt);

      const sql = `INSERT INTO users (id, email, password, firstname, lastname, created_at, verification_status, token, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [createRows] = await con.promise().query(sql, [newUser.id, newUser.email, newUser.password, newUser.firstname, newUser.lastname, newUser.created_at, newUser.verification_status, newUser.token, newUser.color]);

      const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        secureConnection: false,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });

      const url = `${process.env.CLIENT_URL}/verify/${newUser.token}`;

      let mailOpt = {
        from: process.env.MAIL_USER,
        to: newUser.email,
        subject: "E-mail confirmation",
        text: `Click here to activate your collaboat account: ${url}`
      };

      transport.sendMail(mailOpt, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(info.response);
        }
      });

      return "Registration success";
    }
  },

  loginUser2: async function (data) {
    const userCheck = await this.checkUser(data.email);

    if (data.email.length < 1 || data.password.length < 1) {
      throw new Error("Error!");
    } else if (userCheck.length < 1) {
      throw new Error("Invalid credentionals");
    } else if (userCheck[0].verification_status === "pending") {
      throw new Error("This account is not activated!");
    } else {
      const isMatch = await bcrypt.compare(data.password, userCheck[0].password);

      if (isMatch === false) {
        throw new Error("Invalid credentionals");
      }

      const payload = {
        user: {
          id: userCheck[0].id
        }
      };

      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "5 days" });

      return token;
    }
  },

  // get current logged in user --> client loaduser()
  getUser: async function (id) {
    const sql = `SELECT users.id, users.email, users.firstname, users.lastname, users.color, users.created_at FROM users WHERE id = ?`;

    const [rows] = await con.promise().query(sql, id);

    return rows;
  },

  checkUser: async function (email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await con.promise().query(sql, email);

    return rows;
  },

  verify: async function (token) {
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

  changeColor: async function (id, color) {
    const sql = `UPDATE users SET color = ? WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [color, id]);

    return rows;
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

  setNewPassword: async function (token, password) {
    const userSql = `SELECT * FROM users WHERE token = ?`;
    const [userFinder] = await con.promise().query(userSql, token);

    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(password, salt);

    const pwdSql = `UPDATE users SET password = ? WHERE token = ?`;
    const [pwdRows] = await con.promise().query(pwdSql, [pwd, token]);

    const newToken = uuid4();

    const sql = `UPDATE users SET token = ? WHERE id = ?`;
    const [rows] = await con.promise().query(sql, [newToken, userFinder[0].id]);

    return rows;
  },

  getUserByProject: async function (id, project) {
    const sql = `SELECT users.* FROM members 
                  INNER JOIN users ON members.users_id = users.id
                  WHERE members.id = ? AND members.projects_id = ?`;

    const [rows] = await con.promise().query(sql, [id, project]);

    return rows[0];
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
        host: process.env.MAIL_HOST, // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD
        }
      });

      const url = `${process.env.CLIENT_URL}/pwd-reset/${newToken}`;

      let mailOpt = {
        from: process.env.MAIL_USER,
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
