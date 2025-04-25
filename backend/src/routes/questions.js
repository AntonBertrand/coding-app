const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single question
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findOne({ id: req.params.id });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new question
router.post("/", async (req, res) => {
  const question = new Question({
    id: req.body.id,
    text: req.body.text,
    code: req.body.code,
    options: req.body.options,
    correctOptionId: req.body.correctOptionId,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
