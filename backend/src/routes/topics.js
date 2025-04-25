const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");
const Language = require("../models/Language");

// Get all topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find().populate("questions");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single topic
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findOne({ id: req.params.id }).populate(
      "questions"
    );
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new topic
router.post("/", async (req, res) => {
  try {
    const language = await Language.findOne({ id: req.body.languageId });
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    const topic = new Topic({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      language: language._id,
      questions: req.body.questions || [],
    });

    const newTopic = await topic.save();

    // Add the topic to the language's topics array
    language.topics.push(newTopic._id);
    await language.save();

    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
