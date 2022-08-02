const con = require("../config/db");
const uuid4 = require("uuid4");
const Task = require("./Task");
const Log = require("./Log");

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

  findAll: async function (project) {
    const sql = `SELECT members.id AS member_id, tasks.id AS task_id, tasks.*, priorities.name AS priorityName, sections.name AS section_name, reviews.id AS review_id, reviews.created_at AS review_created_at, reviews.accepted FROM reviews
                    INNER JOIN tasks ON reviews.tasks_id = tasks.id
                    INNER JOIN priorities ON tasks.priorities_id = priorities.id
                    INNER JOIN sections ON tasks.sections_id = sections.id
                    INNER JOIN members ON reviews.members_id = members.id
                    INNER JOIN users ON members.users_id = users.id
                    WHERE members.projects_id = ?`;

    const [rows] = await con.promise().query(sql, [project]);

    return rows;
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

  findPanel: async function (project) {
    const sql = `SELECT members.id AS member_id, users.firstname, users.lastname, users.color, COUNT(reviews.id) AS total FROM reviews
                  RIGHT JOIN members ON reviews.members_id = members.id
                  INNER JOIN users ON members.users_id = users.id
                  WHERE members.projects_id = ?
                  GROUP BY members.id`;

    const [rows] = await con.promise().query(sql, project);

    console.log(rows);

    return rows;
  },

  delete: async function (project_id, id, task_id, member_id, comment, sender) {
    const sql = `DELETE FROM reviews WHERE id = ?`;
    // Delete review
    const [rows] = await con.promise().query(sql, [id]);
    // Update task status to In Progress
    const taskRow = await Task.updateStatus("1", task_id);

    const singleTaskRow = await Task.getOne(task_id);
    console.log(singleTaskRow[0].title);

    const text = `rejected your submitted task`;

    const logRow = await Log.create(project_id, member_id, sender, "task", singleTaskRow[0].title, text, comment);

    return rows;
  },

  accept: async function (project_id, id, task_id, member_id, comment, sender) {
    const sql = `DELETE FROM reviews WHERE id = ?`;
    // Delete Review
    const [rows] = await con.promise().query(sql, [id]);
    // Update task status to Completed
    const taskRow = await Task.updateStatus("3", task_id);

    const singleTaskRow = await Task.getOne(task_id);

    const text = `accepted your submitted task`;

    console.log(comment);

    const logRow = await Log.create(project_id, member_id, sender, "task", singleTaskRow[0].title, text, comment);

    return rows;
  }
};
