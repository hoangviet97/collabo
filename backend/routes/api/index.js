const express = require("express");
const authRoutes = require("./auth");
const projectRoutes = require("./projects");
const memberRoutes = require("./members");
const sectionRoutes = require("./sections");
const taskRoutes = require("./tasks");
const sessionRoutes = require("./session");
const talkingPointRoutes = require("./talking_points");
const invitationRoutes = require("./invitation");
const fileRoutes = require("./files");
const folderRoutes = require("./folders");
const timerRoutes = require("./timers");
const noteRoutes = require("./notes");
const tagRoutes = require("./tags");
const messageRoutes = require("./messages");
const incomeRoutes = require("./incomes");
const router = express.Router();

router.use(authRoutes);
router.use(projectRoutes);
router.use(memberRoutes);
router.use(sectionRoutes);
router.use(taskRoutes);
router.use(sessionRoutes);
router.use(talkingPointRoutes);
router.use(invitationRoutes);
router.use(fileRoutes);
router.use(folderRoutes);
router.use(timerRoutes);
router.use(noteRoutes);
router.use(tagRoutes);
router.use(messageRoutes);
router.use(incomeRoutes);

module.exports = router;
