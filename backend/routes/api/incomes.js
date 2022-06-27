const express = require("express");
const incomeController = require("../../controllers/income.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.post("/:project/incomes/add", [auth, getMemberId], incomeController.create);
router.get("/:project/incomes", auth, incomeController.findAll);
router.delete("/:project/incomes/:id", auth, incomeController.delete);

module.exports = router;
