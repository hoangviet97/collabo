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
const router = express.Router();

router.use("/", authRoutes);
router.use("/projects", projectRoutes);
router.use("/members", memberRoutes);
router.use("/sections", sectionRoutes);
router.use("/tasks", taskRoutes);
router.use("/sessions", sessionRoutes);
router.use("/talking-points", talkingPointRoutes);
router.use("/invitation", invitationRoutes);
router.use("/files", fileRoutes);
router.use("/folders", folderRoutes);
router.use("/timers", timerRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
