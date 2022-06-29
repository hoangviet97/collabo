const express = require("express");
const reviewController = require("../../controllers/review.controller");
const auth = require("../../middleware/auth");
const getMemberId = require("../../middleware/getMemberId");
const router = express.Router();

router.post("/:project/reviews/add", [auth, getMemberId], reviewController.create);
router.get("/:project/reviews/:member", [auth], reviewController.getAll);
router.delete("/:project/reviews/:id", auth, reviewController.delete);
router.delete("/:project/reviews/:id/accept", auth, reviewController.delete);

module.exports = router;
