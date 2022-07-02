const con = require("../config/db");
const uuid4 = require("uuid4");
const Task = require("./Task");

class Review {
  constructor(id, member_id, task_id, message, accepted) {
    this.id = id;
    this.member_id = member_id;
    this.task_id = task_id;
    this.created_at = new Date();
    this.message = message;
    this.accepted = accepted;
  }
}

module.exports = {
  Review,
  // create new member by user or by admin
  create: async function (member, body) {
    const newReview = new Review(uuid4(), member, body.task_id, "", "F");
    const sql = `INSERT INTO reviews (id, members_id, tasks_id, created_at, message, accepted) VALUES (?, ?, ?, ?, ?, ?)`;

    const [rows] = await con.promise().query(sql, [newReview.id, newReview.member_id, newReview.task_id, newReview.created_at, newReview.message, newReview.accepted]);
    const taskRow = await Task.updateStatus("5", body.task_id);
    console.log(newReview);
    return newReview;
  },

  find: async function (member) {
    const sql = `SELECT members.id AS member_id, tasks.id AS task_id, tasks.*, priorities.name AS priorityName, sections.name AS section_name, reviews.id AS review_id, reviews.created_at AS review_created_at, reviews.accepted FROM reviews
                    INNER JOIN tasks ON reviews.tasks_id = tasks.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    INNER JOIN members ON reviews.members_id = members.id
                    INNER JOIN users ON members.users_id = users.id
                    WHERE reviews.members_id = ?`;

    const [rows] = await con.promise().query(sql, [member]);

    return rows;
  },

  delete: async function (id, task_id) {
    const sql = `DELETE FROM reviews WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    const taskRow = await Task.updateStatus("1", task_id);

    return rows;
  },

  accept: async function (id, task_id) {
    const sql = `DELETE FROM reviews WHERE id = ?`;
    const [rows] = await con.promise().query(sql, [id]);

    const taskRow = await Task.updateStatus("3", task_id);

    return rows;
  }
};
