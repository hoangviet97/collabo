const express = require("express");
const reviewController = require("../../controllers/review.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.post("/:project/reviews/add", [auth, getMemberId], reviewController.create);
router.get("/:project/reviews/:member", [auth], reviewController.getAll);
router.post("/:project/reviews/:id/return", auth, reviewController.delete);
router.post("/:project/reviews/:id/accept", auth, reviewController.accept);

module.exports = router;
