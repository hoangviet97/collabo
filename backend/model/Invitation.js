const con = require("../config/db");
const uuid4 = require("uuid4");
const Member = require("./Member");
const User = require("./User");

class Invitation {
  constructor(id, sender, receiver, project) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.created_at = new Date();
    this.project = project;
    this.seen = false;
  }
}

module.exports = {
  // Invitation class
  Invitation,

  create: async function (receiver_email, sender, project) {
    const user = await User.getIdByEmail(receiver_email);

    if (user === sender) {
      throw new Error("You cannot invite yourself");
    }

    if (user.length < 1) {
      throw new Error("User doesn't exist");
    }

    const member = await Member.findMember(user, project);

    if (member.length > 0) {
      throw new Error("User is already in project");
    }

    const sql = `INSERT INTO invitations (id, sender, receiver, created_at, projects_id, seen) VALUES (?, ?, ?, ?, ?, ?)`;
    const invitation = new Invitation(uuid4(), sender, user, project);
    const [rows] = await con.promise().query(sql, [invitation.id, invitation.sender, invitation.receiver, invitation.created_at, invitation.project, invitation.seen]);
    const invRow = await this.findOne(invitation.id);

    return invRow;
  },

  // Get all user's invitations
  find: async function (user) {
    const sql = `SELECT invitations.*, users.firstname, users.lastname, projects.name AS project_name FROM invitations 
                  INNER JOIN users ON invitations.sender = users.id 
                  INNER JOIN projects ON invitations.projects_id = projects.id WHERE receiver = ?`;

    const [rows] = await con.promise().query(sql, [user]);

    return rows;
  },

  accept: async function (id, user, project) {
    const sql = `INSERT INTO members (id, users_id, roles_id, projects_id, created_at) VALUES (?, ?, ?, ?, ?)`;

    const memberQuery = await Member.create(user, project, "2");
    const invitationQuery = await this.deleteInvitation(id);

    return invitationQuery;
  },

  // Get all project invitations
  findAll: async function (project) {
    const sql = `SELECT invitations.*, users.email FROM invitations INNER JOIN users ON invitations.receiver = users.id WHERE projects_id = ?`;

    const [rows] = await con.promise().query(sql, [project]);

    return rows;
  },

  findOne: async function (id) {
    const sql = `SELECT invitations.*, users.firstname, users.lastname, projects.name AS project_name FROM invitations 
                  INNER JOIN users ON invitations.sender = users.id 
                  INNER JOIN projects ON invitations.projects_id = projects.id
                  WHERE invitations.id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows[0];
  },

  // Get all invitations
  updateSeenStatus: async function (id) {
    const sql = `UPDATE invitations SET seen = true WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return 1;
  },

  deleteInvitation: async function (id) {
    const sql = `DELETE from invitations WHERE id = ?`;

    const [rows] = await con.promise().query(sql, [id]);

    return rows;
  }
};
