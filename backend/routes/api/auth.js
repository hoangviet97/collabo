const express = require("express");
const { uuid } = require("uuidv4");
const router = express.Router();

router.get("/register", (req, res) => {
  res.send("register route");
});

module.exports = router;
