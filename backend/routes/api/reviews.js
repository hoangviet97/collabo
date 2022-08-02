const express = require("express");
const reviewController = require("../../controllers/review.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.get("/:project/reviews/members", [auth], reviewController.getPanel);
router.post("/:project/reviews/add", [auth, getMemberId], reviewController.create);
router.get("/:project/reviews", [auth], reviewController.getByProject);
router.get("/:project/reviews/:member", [auth], reviewController.getAll);
router.post("/:project/reviews/:id/return", [auth, getMemberId], reviewController.delete);
router.post("/:project/reviews/:id/accept", [auth, getMemberId], reviewController.accept);

module.exports = router;
