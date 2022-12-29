const express = require("express");
const reviewController = require("../../controllers/review.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const permit = require("../../middleware/permission");
const router = express.Router();

router.get("/:project/reviews/members", [auth], reviewController.getPanel);
router.post("/:project/reviews/add", [auth, permit("Owner", "Admin"), getMemberId], reviewController.create);
router.get("/:project/reviews", [auth], reviewController.getByProject);
router.get("/:project/reviews/:member", [auth], reviewController.getAll);
router.post("/:project/reviews/:id/return", [auth, permit("Owner", "Admin"), getMemberId], reviewController.delete);
router.post("/:project/reviews/:id/accept", [auth, permit("Owner", "Admin"), getMemberId], reviewController.accept);

module.exports = router;
