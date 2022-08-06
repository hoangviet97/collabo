const express = require("express");
const incomeController = require("../../controllers/income.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const permit = require("../../middleware/permission");
const router = express.Router();

router.post("/:project/incomes/add", [auth, permit("Owner", "Admin"), getMemberId], incomeController.create);
router.get("/:project/incomes", auth, incomeController.findAll);
router.get("/:project/incomes/sum", auth, incomeController.getSum);
router.delete("/:project/incomes/:id", [auth, permit("Owner", "Admin")], incomeController.delete);

module.exports = router;
