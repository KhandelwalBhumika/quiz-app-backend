require("dotenv").config();

const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authenticateToken");
const quizController = require("../controller/quizController");

//get a question
router.get("/questions", authenticateToken, quizController.getQuestions);

//add a question
router.post("/add-question", authenticateToken, quizController.addQuestion);

//calculate-score
router.post('/calculate-score', authenticateToken, quizController.calculateScore);

module.exports = router;
