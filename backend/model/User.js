const { registerValidation } = require("../validation/auth");
const con = require("../config/db");
const uuid4 = require("uuid4");
const bcrypt = require("bcryptjs");

require("dotenv").config();

module.exports = {
  create: async function (data, result) {
    const { error } = registerValidation(data);

    if (error) {
      result(error, null);
      return;
    }

    const newUser = {
      id: uuid4(),
      email: data.email,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      created_at: new Date()
    };

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

      console.log(res);
      result(null, res);
    });
  }
};
